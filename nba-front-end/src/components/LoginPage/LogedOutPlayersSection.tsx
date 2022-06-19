import { Grid, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Player } from '../../models/IPlayer';
import api from '../../services/api';


const playerColumns: GridColDef[] = [
    { field: 'PlayerID', headerName: 'ID', minWidth: 90, hide: true },
    { field: 'FirstName', headerName: 'First Name', minWidth: 150, flex:1 },
    { field: 'LastName', headerName: 'Last Name', minWidth: 150, flex:1 },
    {
      field: 'FullName',
      headerName: 'Name',
      sortable: false,
      minWidth: 160,
        hide: true,
        flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.FirstName || ''} ${params.row.LastName || ''}`,
        
    },
    { field: 'PlayerWinPercent', headerName: 'Win Percentage', minWidth: 150,
      valueFormatter: (params) => {
        const valueFormatted = Number((params.value as number) * 100).toLocaleString();
        return `${valueFormatted} %`;
      }, 
    },
    { field: 'Points', headerName: 'Points', minWidth: 120, flex:1 },
    { field: 'Rebounds', headerName: 'Rebounds', minWidth: 120, flex:1 },
    { field: 'Assists', headerName: 'Assists', minWidth: 120, flex:1 },
    { field: 'Steals', headerName: 'Steals', minWidth: 120, flex:1 },
    { field: 'Blocks', headerName: 'Blocks', minWidth: 120, flex:1 },
];

function LogedOutPlayersSection() {   
    
    const [playerList, setPlayerList] = useState<Player[]>()
    const [IsError, setIsError] = useState<boolean>(false)

    const getAllPlayers = () => {
        
        api.get('players/get-all')
            .subscribe({
                next: (players) => {                    
                    setPlayerList(players as Player[]);
                    setIsError(false)
                },
                error: (e) => {                
                    // this sets 'errorMessage' into the error that has occured                    
                    setIsError(true)
                }          
            })
    }

    useEffect(() => {
        getAllPlayers()
    }, [setPlayerList])
    
    const renderPlayersTable = () => {
        if (playerList) {
            return (
                <DataGrid
                    rows={playerList}
                    getRowId={(row) => row.PlayerID}
                    columns={playerColumns}
                    disableColumnSelector={true}
                    pageSize={20}
                    rowsPerPageOptions={[20]}                    
                    disableSelectionOnClick
                />
                
            )
        } else if(!IsError) {
            return(<h1>Loading Please Wait</h1>)
        } else {
            return(<h1 style={{color:'red'}}>Sorry the API is down</h1>)
        }
    }
    

    return (
        
        <Paper
            sx={{
                m: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                maxWidth: 'auto'
                }}
                >               
        <Grid            
            item xl={12} md={12} xs={12}
            sx={{ height: '60vh', padding: '15px' }}
            >
            
                {renderPlayersTable()}
                            
        </Grid>
        </Paper>
    )
}

export default LogedOutPlayersSection


// onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
//filterModel={filterModel}