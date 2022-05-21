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

import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import api from "../../services/api";
import RemoveTeamPopUp from "./RemoveTeam/RemoveTeamPopUp";
import CreateTeamPopUp from "./CreateTeam/CreateTeamPopUp";
import { useAuth0 } from "@auth0/auth0-react";




const TeamList: React.FC<any> = (props) => {

    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component

    const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = React.useState(false);

    //opens remove team popup
    const handleopenRemoveTeamPopUp = () => {
    setOpenRemoveTeamPopUp((prev) => !prev)
    }

//-------------------- Column Headers ----------------------------//
    const teamsColumns: GridColDef[] = [
        { field: "TeamID", headerName: "ID", width: 90, hide: true },
        { field: "TeamName", headerName: "Team Name", width: 150 },
    //-------------------- Renders the remove team button --------------------//
        { 
            field: "RemoveTeam",
            headerName: "",
            width: 90,
            renderCell: (params: any) =>
            (
                <RemoveTeamButton
                    teamObject={params.row}
                    handleopenRemoveTeamPopUp={handleopenRemoveTeamPopUp}
                />
            )
        },
        {
          field: "TeamWinPercentage",
          headerName: "Win Percentage",
          width: 150,
          valueFormatter: (params) => {
            const valueFormatted = Number(
              (params.value as number) * 100
            ).toLocaleString();
            return `${valueFormatted} %`;
          },
        }
    ];

    const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
        setOpen(true);
    };

    const [newTeamID, setNewTeamID] = React.useState("");


    const { getAccessTokenSilently } = useAuth0();



    useEffect(() => {
        props.setSelectionModel(newTeamID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[newTeamID]);
    
    const getAllTeams = async () => {

        const token = await getAccessTokenSilently();

        console.log(token)

        api.get('/team/get-all', {
            Headers: {
                'Authorization':`Bearer ${token}`
            }
        }).subscribe(
            (resp) => {
                props.setTeamList(resp)
            })
        

    }


    //when open changes API is run
    useEffect(() => {
        
        getAllTeams()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, openRemoveTeamPopUp])

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
                    <div style={{ height: '600px', width: '100%'}}>
                        <DataGrid
                            autoHeight
                            rows={props.teamList}
                            getRowId={(row) => row.TeamID}
                            columns={teamsColumns}
                            disableColumnSelector={true}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onSelectionModelChange={(newSelectionModel) => {
                                props.setSelectionModel(newSelectionModel);
                            }}
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
                    setNewTeamID={setNewTeamID}
                />
            </Grid>
        </Paper>
    );
}
export default TeamList;