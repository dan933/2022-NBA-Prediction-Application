import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { axiosRequestConfiguration } from "../../services/axios_config";
import axios, { AxiosError } from 'axios';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
// import { Player } from '../models/IPlayer';

// Setting up the columns of the player table
const playerColumns: GridColDef[] = [
    { field: 'PlayerID', headerName: 'ID', width: 90, hide: true },
    { field: 'FirstName', headerName: 'First Name', width: 150, },
    { field: 'LastName', headerName: 'Last Name', width: 150, },
    {
      field: 'FullName',
      headerName: 'Name',
      sortable: false,
      width: 160,
      flex: 1,
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

const AddPlayerTable: React.FC<any> = (props) => {

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

  // when you type in the searchbar, update the value of the object
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // can't update anything else here because of how the hook works, use useEffect hook instead
  }



// todo: adds the selected player to a list, logs their playerid - this should log their rowdata instead

// const [selected, setSelected] = React.useState<readonly string[]>([]);


//   const handleClick = () => {  
//     const selectedIndex = selected.indexOf(playerList);
//     let newSelected: readonly string[] = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, playerList);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//     console.log(newSelected);
//   };

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

const addPlayerTeam = () => {
  // let teamNameObject = { TeamName: teamName.current?.value }

  axios.post(`${url}/team/${teamID}/addPlayers`, selectionModel)
  .then(function (response) {
  if ( response.data.Success === true) {
      props.tableIsUpdated();
      // if success call api again.
      //todo use useEffect() instead
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
  
  const useStyles = makeStyles({
    root: {
      "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
        {
          outline: "none",
        },
    },
  });

  const classes = useStyles();



  


  // todo: add onclick to update add player to team value
  return (
    // white box around the table
    // <Paper
    //     sx={{
    //       p: 2,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       height: 'auto',
    //       maxWidth: 'auto'
          
    //     }}
    //   >
    <div>
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
            <div style={{ height: '600px', width: '100%' }}>
              <DataGrid
               className={classes.root}
              rows={playerList}
              getRowId={(row) => row.PlayerID}
              columns={playerColumns}
              disableColumnSelector={true}
              pageSize={11}
              rowsPerPageOptions={[11]}
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
              disableSelectionOnClick={false}
              checkboxSelection={true}
              // onRowClick={handleClick}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              />
            </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={addPlayerTeam}>Add Players</Button>
      </div>
      // </Paper>
      
  );
}
export default AddPlayerTable;