import React, { useEffect, useRef, useState } from "react";
import {
    Button, Grid, Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveTeamButton from "./RemoveTeam/RemoveTeamButton"
import TeamPageContentLoader from "./TeamPageContentLoader";
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import api from "../../services/api";
import RemoveTeamPopUp from "./RemoveTeam/RemoveTeamPopUp";
import CreateTeamPopUp from "./CreateTeam/CreateTeamPopUp";
import { makeStyles } from '@material-ui/core/styles';    
    
const TeamList: React.FC<any> = (props) => {
    
    const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = React.useState(false);

    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component

    const teamsColumns: GridColDef[] = [
        { field: "TeamID", headerName: "ID", width: 90, hide: true, flex:1 },
        { field: "TeamName", headerName: "Team Name", width: 150, flex:1  },
        
        //-------------------- Formats Team Winrate --------------------//
        {
            field: "WinChance",
            headerName: "Win Percentage",
            width: 125, 
            flex:1, 
            
            valueFormatter: (params) => {
              const valueFormatted = Number(
                (params.value as number) * 100
              ).toLocaleString();
              return `${valueFormatted} %`;
              
            },
          },
    //-------------------- Renders the remove team button --------------------//
        {
            field: "RemoveTeam",
            headerName: "",
            width: 90,
            hideSortIcons: true,
            renderCell: (params: any) => {
                return (               
                    <RemoveTeamButton                    
                        teamObject={params.row}
                        setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}
                        setTeamList={props.setTeamList}                    
                    />
                )
                
            }
        },
    ];

    

    const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
        setOpen(true);
    };

    const handleRowChanges = (selectedRow: any) => {

        if (selectedRow.field !== "RemoveTeam") {
            props.setSelectionModel(selectedRow.row.TeamID)
        }
    }

    const [newTeamID, setNewTeamID] = React.useState("");

    const changeTeamSelected = (newSelectionModel: any) => {
        props.setSelectionModel(newSelectionModel)
    }
    
    useEffect(() => {
       changeTeamSelected(newTeamID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTeamID]); 

    

    const getWinChance = async () => {

        api.GetAllTeams().then(resp => {

            props.setTeamList(resp.data.Data);            
            
        }).catch((err) => { console.log(err) })        
    }
         
    // on changes to open state api is run
    useEffect(() => {
        if (props.selectionModel) {
        getWinChance()
        }    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, openRemoveTeamPopUp, props.isUpdated])

    const useStyles = makeStyles({
        root: {
            '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                outline: 'none',
            },
        }
    });

 
    const classes = useStyles();

   

    return (
        <Paper
            sx={{ p: 2, height: '800px' }}
        >
            <Grid container spacing={3}>
                <Grid item>
                    <h2 style={{ margin: 0 }}>Teams</h2>
                </Grid>
                {/* add team button */}
                <Grid item>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={handleClickOpen}
                    >
                        Create New Team
                    </Button>
                </Grid>
                <Grid item xs={12}>

                    <div style={{ width: '100%' }}>
                        <DataGrid  
                            className={classes.root}
                            style={{ width: '100%', display: '-ms-flexbox'}}
                            autoHeight
                            rows={props.teamList}
                            getRowId={(row) => row.TeamID}
                            columns={teamsColumns}
                            disableColumnSelector={true}                            
                            disableColumnMenu={true}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onCellClick={(event) => {handleRowChanges(event)}}
                            selectionModel={props.selectionModel}                            
                        />                        
                    </div>
                </Grid>                
                
                <CreateTeamPopUp
                    open={open}
                    setOpen={setOpen}
                    teamName={teamName}
                    setNewTeamID={setNewTeamID}
                />
                
                <RemoveTeamPopUp
                    openRemoveTeamPopUp={openRemoveTeamPopUp}
                    setOpenRemoveTeamPopUp={setOpenRemoveTeamPopUp}
                    teamId={props.selectionModel}                    
                    teamList={props.teamList}
                />
            </Grid>
        </Paper>
    );
}
export default TeamList;