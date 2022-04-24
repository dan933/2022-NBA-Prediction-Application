import * as React from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridValueGetterParams } from '@mui/x-data-grid';
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';


const teamColumns: GridColDef[] = [
    { field: 'TeamID', headerName: 'ID', width: 90, hide: true },
    { field: 'TeamName', headerName: 'Team Name', width: 150, },
    { field: 'TeamWinPercentage', headerName: 'Win Percentage', width: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`; 
      },
    },
  ];

  
const DataGridTeams: React.FC<any> = (props) => {
  
  const teamList = props.teamList;

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
          <Grid item xs={12}>
            <div style={{ height: '800px', width: '450px', position:'relative'}}>
              <DataGrid
              rows={teamList}
              getRowId={(row) => row.TeamID}
              columns={teamColumns}
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