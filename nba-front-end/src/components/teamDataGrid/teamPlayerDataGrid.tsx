import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import Button from '@mui/material/Button';

// Setting up the columns of the player table
const teamPlayerColumns: GridColDef[] = [
    { field: 'TeamID', headerName: 'Team ID', width: 90, hide: true },
    { field: 'TeamName', headerName: 'Team Name', width: 90, hide: true },
    { field: 'PlayerID', headerName: 'Player ID', width: 90, hide: true },
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
    { field: 'Points', headerName: 'Points', width: 120 },
    { field: 'Rebounds', headerName: 'Rebounds', width: 120 },
    { field: 'Assists', headerName: 'Assists', width: 120 },
    { field: 'Steals', headerName: 'Steals', width: 120 },
    { field: 'Blocks', headerName: 'Blocks', width: 120 },
  ];

const DataGridTeamPlayers: React.FC<any> = (props) => {

  // this takes the props passed to this component and uses it to populate the table
  const teamPlayerList = props.teamPlayerList;

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

  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // can't update anything else here because of how the hook works, use useEffect hook instead
  }

  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

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
    console.log(selectionModel);

},[search, selectionModel]);

const url = axiosRequestConfiguration.baseURL


const removePlayerTeam = () => {
  // let teamNameObject = { TeamName: teamName.current?.value }

  axios.delete(`${url}/team/${teamID}/removePlayers`, {data: selectionModel})
  .then(function (response) {
    if ( response.data != null) {
      console.log(response);
      props.tableIsUpdated();
    }
  })
    .catch((error) => {

//https://www.codegrepper.com/code-examples/javascript/response.error+console.log
      
      const err: any = error as AxiosError
      
      // if (err.response.status === 409) {
      //   setIsError(true)
      // }
  });
  


};

  return (
    // white box around the table
    <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          maxWidth: 'auto'
          
        }}
      >
        {/* formats the placement of the searchbar and table */}
        <Grid container spacing={2}>
         <Grid item xl={4} md={6} xs={12}>
          <FormControl variant="outlined" size="small" max-width="true">
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
            <div style={{ height: '400px', width: '100%'}}>
              <DataGrid
                rows={teamPlayerList}
                getRowId={(row) => row.PlayerID}
                columns={teamPlayerColumns}
                disableColumnSelector={true}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
              />
          </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={removePlayerTeam}>Remove Player</Button>
      </Paper>
  );
}
export default DataGridTeamPlayers;