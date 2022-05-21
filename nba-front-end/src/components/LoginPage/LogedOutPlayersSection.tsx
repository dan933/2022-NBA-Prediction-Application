import { Grid } from '@mui/material';
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

    const [IsLoaded, setIsLoaded] = useState(false);
    
    const [playerList, setPlayerList] = useState<Player[]>()

    const getAllPlayers = () => {
        
        api.get('players/get-all')
            .subscribe({
                next: (players) => {
                    console.log(players)
                    setPlayerList(players as Player[]);
                    setIsLoaded(true);
                },
                error: (e) => {
                    setIsLoaded(true);
                    // this sets 'errorMessage' into the error that has occured
                    //setErrorMessage(e);
                }
          
            })
    }

    useEffect(() => {
        getAllPlayers()
    }, [setIsLoaded])
    
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
        } else {
            return(<h1>Loading Please Wait</h1>)
        }
    }
    

    return (
        
        <Grid
        item xl={12} md={12} xs={12}
        sx={{ height: '60vh', padding: '15px' }}
        >
            {renderPlayersTable()}
        </Grid>
        
    )
}

export default LogedOutPlayersSection


// onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
//filterModel={filterModel}