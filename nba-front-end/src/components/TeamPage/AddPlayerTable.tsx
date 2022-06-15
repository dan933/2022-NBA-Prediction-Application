import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams } from '@mui/x-data-grid';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useContext } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import AddPlayerButton from './AddPlayer/AddPlayerButton';
import { useAuth0 } from '@auth0/auth0-react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { TeamPageContext } from '../../services/Contexts/TeamPageContext';
import { TeamPageContextType } from '../../models/ContextModels/TeamPageContextModels';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPlayerTable: React.FC<any> = (props) => {

  const { teamSelectionModel, playersList, teamPlayersList, setTeamPlayersList } = useContext(TeamPageContext) as TeamPageContextType

  const [open, setOpen] = React.useState(false);

  const openAddedPlayerSnackBar = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Setting up the columns of the player table
  const playerColumns: GridColDef[] = [
    {
      field: "addplayer",
      headerName: "",
      width: 70,
      renderCell: (params: any) =>
      (
          <AddPlayerButton
              disabled={checkIsNotAddable(params.row.PlayerID, teamPlayersList, teamSelectionModel.TeamID)}
              handleAddPlayer={ () => addPlayerTeam([params.row.PlayerID])}
          />
      )
    },
    { field: 'PlayerID', headerName: 'ID', width: 90, hide: true },
    { field: 'FirstName', headerName: 'First Name', width: 150, },
    { field: 'LastName', headerName: 'Last Name', width: 150, },
    {
      field: 'FullName',
      headerName: 'Name',
      sortable: false,
      width: 160,
      hide: true,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,

    },
    {
      field: 'PlayerWinPercent', headerName: 'Win Percentage', width: 150,
      valueGetter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    { field: 'Points', headerName: 'Points', minWidth: 120, flex: 0.3 },
    { field: 'Rebounds', headerName: 'Rebounds', minWidth: 120, flex: 0.3 },
    { field: 'Assists', headerName: 'Assists', minWidth: 120, flex: 0.3 },
    { field: 'Steals', headerName: 'Steals', minWidth: 120, flex: 0.3 },
    { field: 'Blocks', headerName: 'Blocks', minWidth: 120, flex: 0.3 },
  ];

    const { getAccessTokenSilently } = useAuth0();

  // initialise the value for the searchbar
  const [search, setSearch] = React.useState('');

  // initialise the value for operator used in searchbar functionality
  const [operator, setOperator] = React.useState('contains')


  // initialise the parameters that the table uses to filter values (when using the searchbar)
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: 'FullName',
        operatorValue: 'contains',
        value: search,
      },
    ],
  });

  const checkIsNotAddable = (playerId: number, teamPlayerIds: any, teamId: any) => {
    // eslint-disable-next-line eqeqeq
    if (teamId == (null || undefined)) {
      return true;
    }
    if (teamPlayerIds?.includes(playerId)) {
      return true;
    }
    return false;
  }

  //initialise state for the Column Filter - Default selection is FullName
  const [dropdownColumn, setDropdownColumn] = React.useState("FullName");

  //creating a handleChange function for the Column Filter - clears search bar upon Changing the value of the Filter
  const handleChangeColumn = (event: any) => {
    setDropdownColumn(event.target.value);
    setSearch("");
  };


  const addPlayerToYourLineUp = (playerID: any) => {
    let playerToAdd:any = playersList.find((player) => player.PlayerID === playerID[0])
    playerToAdd = { TeamID: teamSelectionModel.TeamID, TeamName: teamSelectionModel.TeamName, ...playerToAdd }

    setTeamPlayersList((prev: any) => { return [...prev, playerToAdd] })
  }

  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (dropdownColumn === "PlayerWinPercent") {
      setOperator('startsWith');
    }
    else if (dropdownColumn === "FullName") {
      setOperator('contains');
    }
    else if (dropdownColumn === "FirstName") {
      setOperator('contains');
    }
    else if (dropdownColumn === "LastName") {
      setOperator('contains');
    }
    else {
      setOperator('equals');
    }
  };


  // when [search] is updated, update the table's filter
  useEffect(() => {
    setFilterModel({
      items: [
        {
          // columnField now references the Column Filter Dropdown
          columnField: dropdownColumn,
          operatorValue: operator,
          value: search,
        },
      ],
    })
  }, [search, dropdownColumn, operator]);

  const url = axiosRequestConfiguration.baseURL

  const addPlayerTeam = async (player:number[]) => {
    const token = await getAccessTokenSilently();
    axios.post(`${url}/team/${teamSelectionModel.TeamID}/addPlayers`, player, {
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .then(function (response) {
      if (response.data.Success === true) {
        addPlayerToYourLineUp(player)
        openAddedPlayerSnackBar()
        // if success call api again.
        //todo use useEffect() instead
    }
    })
      .catch((error) => {
        const err: any = error as AxiosError
        console.log(err);
      });
  };

  //creating a function for clear search bar button
  const clearInput = () => {
    setSearch("");
  }

  return (
    <>
      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={2}>
        <Grid item xl={4} lg={5} md={6} sm={4} xs={4} sx={{ display: "flex" }}>
          <FormControl fullWidth sx={{ minWidth: 120 }} size="small">
            <InputLabel id="Column-dropdown">Column</InputLabel>
            <Select
              labelId="Column-dropdown"
              id="Column-dropdown"
              value={dropdownColumn}
              label="Column"
              onChange={handleChangeColumn}
            >
              <MenuItem value={"FullName"}>Full Name</MenuItem>
              <MenuItem value={"FirstName"}>First Name</MenuItem>
              <MenuItem value={"LastName"}>Last Name</MenuItem>
              <MenuItem value={"PlayerWinPercent"}>Win Percentage</MenuItem>
              <MenuItem value={"Points"}>Points</MenuItem>
              <MenuItem value={"Rebounds"}>Rebounds</MenuItem>
              <MenuItem value={"Assists"}>Assists</MenuItem>
              <MenuItem value={"Steals"}>Steals</MenuItem>
              <MenuItem value={"Blocks"}>Blocks</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xl={8} lg={7} md={6} sm={8} xs={8} sx={{ display: "flex" }} >
          <FormControl sx={{ flexGrow: 1 }} variant="outlined" size="small" >
            <InputLabel htmlFor="outlined-search">Search for a player</InputLabel>
            <OutlinedInput
              id="outlined-search"
              label="Search for a player"
              value={search}
              onChange={handleChange}
              // formats placement of clear search bar button
              endAdornment={
                <InputAdornment position="end">
                  {/* creates a condition - if user types in search bar, the clear button will replace the search icon */}
                  {search.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>


        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={1050} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Player Successfully Added!
            </Alert>
          </Snackbar>
        </Stack>


        <Grid item xs={12}>
          <div style={{ width: '100%' }}>
            <DataGrid
            autoHeight
            rows={playersList}
            loading={props.isLoading}
            getRowId={(row) => row.PlayerID}
            columns={playerColumns}
            disableColumnSelector={true}
            disableColumnMenu={true}
            pageSize={10}
            rowsPerPageOptions={[10]}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
            disableSelectionOnClick={true}
            checkboxSelection={false}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default AddPlayerTable;