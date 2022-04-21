import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams } from '@mui/x-data-grid';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';


const teamsColumns: GridColDef[] = [
    { field: 'TeamID', headerName: 'ID', width: 90, hide: false },
    { field: 'TeamName', headerName: 'Team Name', width: 150, },
    { field: 'TeamWinPercentage', headerName: 'Win Percentage', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`; 
    },
},

  ];

  const rows = [
    { TeamID: 1, TeamName: 'Team 1', TeamWinPercentage: 0.43},
    { TeamID: 2, TeamName: 'Team 2', TeamWinPercentage: 0.25},
    { TeamID: 3, TeamName: 'Team 3', TeamWinPercentage: 0.10 },
   
  ];

  
const DataGridTeams: React.FC<any> = (props) => {
    
  return (
    // white box around the table
    <Paper 
        sx={{
          p: 2,
          paddingTop:5,
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          mt: 'auto',
          position:'relative', 
          left:'-165px',
          width:'482px'
        }}
      >
        {/* formats the placement of the searchbar and table */}
        <Grid container spacing={3}/>
         <Grid item xl={3} md={6} xs={12}/>
          <Grid item xs={12}>
            <div style={{ height: '800px', width: '450px', position:'relative'}}>
              <DataGrid
              rows={rows}
              getRowId={(row) => row.TeamID}
              columns={teamsColumns}
              disableColumnSelector={true}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              />
            </div>
          </Grid>
      </Paper>
  );
}


export default DataGridTeams;