import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams  } from '@mui/x-data-grid';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import AddPlayerButton from './AddPlayer/AddPlayerButton';
// import { Player } from '../models/IPlayer';


const AddPlayerTable: React.FC<any> = (props) => {
  
  // Setting up the columns of the player table
  const playerColumns: GridColDef[] = [
    { 
      field: "addplayer",
      headerName: "",
      width: 90,
      renderCell: (params: any) =>
      (
          <AddPlayerButton
              disabled={checkIsNotAddable(params.row.PlayerID,props.teamPlayersList,teamID)}
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
    { field: 'PlayerWinPercent', headerName: 'Win Percentage', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`;
      }, 
    },
    { field: 'Points', headerName: 'Points', width: 120, flex: 0.3 },
    { field: 'Rebounds', headerName: 'Rebounds', width: 120, flex: 0.3 },
    { field: 'Assists', headerName: 'Assists', width: 120, flex: 0.3 },
    { field: 'Steals', headerName: 'Steals', width: 120, flex: 0.3 },
    { field: 'Blocks', headerName: 'Blocks', width: 120, flex: 0.3 },
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

  const checkIsNotAddable = (playerId:number, teamPlayerIds:number[], teamId:any) => {
    if(teamID.length === 0){
      return true;
    }
    if(teamPlayerIds?.includes(playerId)){
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
  useEffect(()=>{
    setFilterModel({
      items: [
        {
          columnField: 'FullName',
          operatorValue: 'contains',
          value: search,
        },
      ],
    });
  },[search]);

  const url = axiosRequestConfiguration.baseURL

  const addPlayerTeam = (player:number[]) => {
    axios.post(`${url}/team/${teamID}/addPlayers`, player)
    .then(function (response) {
    if ( response.data.Success === true) {
        props.tableIsUpdated();
        // if success call api again.
        //todo use useEffect() instead
    }
    })
      .catch((error) => {
        const err: any = error as AxiosError
        console.log(err);
    });
  };  

  return (
    <>
      {/* formats the placement of the searchbar and table */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <FormControl variant="outlined" size="small" fullWidth={true}>
          <InputLabel htmlFor="outlined-search">Search for a player</InputLabel>
          <OutlinedInput
            id="outlined-search"
            label="Search for a player"
            value={search}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <div style={{ width: '100%' }}>
            <DataGrid
            autoHeight
            rows={playerList}
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