import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import Button from '@mui/material/Button';
import api from "../../services/api";
import { makeStyles } from '@material-ui/core/styles';
import TeamPageContentLoader from './TeamPageContentLoader';
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
    { field: 'Points', headerName: 'Points', width: 120, flex: 0.3 },
    { field: 'Rebounds', headerName: 'Rebounds', width: 120, flex: 0.3 },
    { field: 'Assists', headerName: 'Assists', width: 120, flex: 0.3 },
    { field: 'Steals', headerName: 'Steals', width: 120, flex: 0.3 },
    { field: 'Blocks', headerName: 'Blocks', width: 120, flex: 0.3 },
  ];

const TeamPlayerTable: React.FC<any> = (props) => {

  // this takes the props passed to this component and uses it to populate the table
  const teamPlayerList = props.teamPlayerList;

  const teamID = props.teamID;

  // initialise the value for the searchbar
  const [search, setSearch] = React.useState('');

  const getWinChance = async () => {
    
    api.GetAllTeams()
      .then((response) => {      
        if ( response.data.Success === true) {  
          //props.setTeamList(response.data.Data);
      }
  
     })
      .catch((err) => {
        throw err
      });
     
    }
      
    
const removePlayerTeam = () => {
  // let teamNameObject = { TeamName: teamName.current?.value }

  axios.delete(`${url}/team/${teamID}/removePlayers`, {data: selectionModel})
  .then(function (response) {
    if ( response.data != null) {
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
  
  // refreshes team wr
  TeamPageContentLoader()
};
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

},[search, selectionModel]);

const url = axiosRequestConfiguration.baseURL



const useStyles = makeStyles({
  root: {
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
          outline: 'none',
      },
  }
});


    React.useEffect(() => {

        getWinChance()
      
         
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [null, TeamPageContentLoader])
      
const classes = useStyles();

  return (
    // white box around the table
  <div>
        {/* formats the placement of the searchbar and table */}
        <Grid container spacing={2}>
         <Grid item xs>
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
            <div style={{ height: '600px', width: '100%'}}>
              <DataGrid
                rows={teamPlayerList}
                className={classes.root}
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
                filterModel={filterModel}
                onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}  
              />
          </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={removePlayerTeam}>Remove Player</Button>
      </div>
  );
}
export default TeamPlayerTable;