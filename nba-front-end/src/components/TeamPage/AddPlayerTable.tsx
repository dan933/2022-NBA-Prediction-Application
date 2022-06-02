import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams, GridToolbarColumnsButton, GridToolbarContainer, } from '@mui/x-data-grid';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import AddPlayerButton from './AddPlayer/AddPlayerButton';
// import { Player } from '../models/IPlayer';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPlayerTable: React.FC<any> = (props) => {
  
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
          disabled={checkIsNotAddable(params.row.PlayerID, props.teamPlayersList, teamID)}
          handleAddPlayer={() => addPlayerTeam([params.row.PlayerID])}
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
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    { field: 'Points', headerName: 'Points', minWidth: 120, flex: 0.3},
    { field: 'Rebounds', headerName: 'Rebounds', minWidth: 120, flex: 0.3},
    { field: 'Assists', headerName: 'Assists', minWidth: 120, flex: 0.3},
    { field: 'Steals', headerName: 'Steals', minWidth: 120, flex: 0.3},
    { field: 'Blocks', headerName: 'Blocks', minWidth: 120, flex: 0.3 },
  ];

  // this takes the props passed to this component and uses it to populate the table
  const playerList = props.playerList;

  const teamID = props.teamID;

  // initialise the value for the searchbar
  const [search, setSearch] = React.useState('');

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

  //initialise state for the Column Filter - Default selection is FullName
  const [dropdownColumn, setDropdownColumn] = React.useState("FullName");

  //creating a handleChange function for the Column Filter - clears search bar upon Changing the value of the Filter
  const handleChangeColumn = (event: any) => {
    setDropdownColumn(event.target.value);
    setSearch("");
  };

  const checkIsNotAddable = (playerId: number, teamPlayerIds: number[], teamId: any) => {
    if (teamID.length === 0) {
      return true;
    }
    if (teamPlayerIds?.includes(playerId)) {
      return true;
    }
    return false;

  };

  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // can't update anything else here because of how the hook works, use useEffect hook instead
  };

  // when [search] is updated, update the table's filter
  useEffect(() => {
    setFilterModel({
      items: [
        {
          // columnField now references the Column Filter Dropdown
          columnField: dropdownColumn,
          operatorValue: 'contains',
          value: search,
        },
      ],
    })
  }, [search, dropdownColumn]);

  const url = axiosRequestConfiguration.baseURL

  const addPlayerTeam = (player: number[]) => {
    axios.post(`${url}/team/${teamID}/addPlayers`, player)
    .then(function (response) {
    if ( response.data.Success === true) {
        props.tableIsUpdated();
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

  //creating a custom toolbar that only contains the Columns Hide and Show
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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

        <FormControl sx={{ m: 1, minWidth: 120, width: '50%' }} variant="outlined" size="small" fullWidth={false} >
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

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={1050} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Player Successfully Added!
        </Alert>
        </Snackbar>
        </Stack>

        </Grid>
        <Grid item xs={12}>
          <div style={{ width: '100%' }}>
            <DataGrid
              autoHeight
              rows={playerList}
              getRowId={(row) => row.PlayerID}
              columns={playerColumns}
              disableColumnMenu={true}
              pageSize={10}
              rowsPerPageOptions={[10]}
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
              disableSelectionOnClick={true}
              checkboxSelection={false}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default AddPlayerTable;