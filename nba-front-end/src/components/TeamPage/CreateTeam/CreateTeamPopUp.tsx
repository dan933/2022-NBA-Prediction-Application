import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { AxiosError } from 'axios';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import api from '../../../services/api';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { TeamPageContext } from '../../../services/Contexts/TeamPageContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateTeamPopUp:React.FC<any> =(props) => {

    //used to referacne
    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component
       
    //Gets the Selection model from SelectionContext.ts
    const { teamSelectionModel } = useContext(TeamPageContext)

    //to set the selection context
    const { setTeamSelectionModel } = useContext(TeamPageContext)

    const [isError, setIsError] = React.useState(false);

    const handleClose = () => {
        setIsError(false)
        props.setOpen(false);
    };
    
    const [open, setOpen] = React.useState(false);

    const openRemoveTeamSnackBar = () => {
      setOpen(true);
    };

    const handleSnackBarClose = () => {
        setOpen(false);
    }

    //------------------------ Create Team API call -------------------------------//
    // gets value from create team form
    const createTeam =  () => {
         api.CreateTeam(teamName.current?.value)
        .then((resp) => {
            if (resp.data.Success === true) {
                let selectedTeam = resp.data.Data
                selectedTeam = { TeamName: selectedTeam.TeamName, TeamID: selectedTeam.TeamID }
                setTeamSelectionModel({ TeamName: selectedTeam.TeamName, TeamID: selectedTeam.TeamID })                
                setIsError(false);
                props.setOpen(false);

                openRemoveTeamSnackBar()
            }
            
        })
        .catch((error) => {                
            const err: any = error as AxiosError
            
            if (err.response && err.response.status === 409) {
                setIsError(true)
            }
            else if(err.response) {

                alert("The API is down ROFL!")
            }            

        })
    }

    return (
    <div>
        <Dialog id="createTeam" open={props.open} onClose={handleClose}>
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

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={1050} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
            Team Successfully Added!!
        </Alert>
      </Snackbar>
      </Stack>
    </div>
  )
}

export default CreateTeamPopUp