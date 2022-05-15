import React, { useEffect, useRef, useState } from "react";
import {
    Button, Grid, Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import RemoveTeamButton from "./RemoveTeam/RemoveTeamButton"

import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import api from "../../services/api";




const TeamList: React.FC<any> = (props) => {

    const [removedTeamId, setremovedTeamId] = useState<any>('');

    //this is function gets values from child components
    const getRemovedTeamNumber = (teamID: any) => {
        setremovedTeamId(teamID)
    }

    useEffect(() => {
        if (!isNaN(removedTeamId)) {
            api.get('/team/get-all').subscribe(
                (resp) => {
                    props.setTeamList(resp)
                })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removedTeamId])
    

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
                    //the function is passed to the child component to get a value
                    getRemovedTeamNumber={getRemovedTeamNumber}
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

    const url = axiosRequestConfiguration.baseURL

    const [isError, setIsError] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component

    const [newTeamID, setNewTeamID] = React.useState("");

    const [newValue, setNewValue] = React.useState(0);



    useEffect(() => {
        props.setSelectionModel(newTeamID);
        setNewValue(1);
        props.setValue(newValue);
    },[newTeamID]);
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setIsError(false)
        setOpen(false);
    };



    // gets value from create team form
    const createTeam = () => {

        let teamNameObject = { TeamName: teamName.current?.value }
        setNewTeamID("");

        axios.post(`${url}/team/create-team`, teamNameObject)
            .then(function (response) {
                if (response.data.Success === true) {
    // sets newTeamID to the TeamID of the created team
                    setNewTeamID(response.data.Data.TeamID);
                    setOpen(false);


                    // if success call api again.
                    //todo use useEffect() instead
                    api.get('/team/get-all').subscribe(
                        (resp) => {
                            props.setTeamList(resp)
                        })
                }
            })
            .catch((error) => {
                const err: any = error as AxiosError

                if (err.response.status === 409) {
                    setIsError(true)
                }
            });
    };

    // on changes to open state api is run
    useEffect(() => {
        api.get('/team/get-all').subscribe(
            (resp) => {
                props.setTeamList(resp)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])


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
                <Dialog id="createTeam" open={open} onClose={handleClose}>
                    <DialogTitle>Create a new team:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new team, please provide a Team Name.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="TeamName"
                            label="Team Name"
                            type="Team Name"
                            fullWidth
                            variant="standard"
                            inputRef={teamName}
                        />
                        {isError && <p style={{ color: "red" }}>This Team Already Exist!</p>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createTeam}>Create </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Paper>
    );
}

export default TeamList;