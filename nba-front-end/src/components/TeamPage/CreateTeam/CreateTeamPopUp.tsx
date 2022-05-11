import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { AxiosError } from 'axios';
import React, { useRef } from 'react'
import api from '../../../services/api';

function CreateTeamPopUp(props:any) {

    const [isError, setIsError] = React.useState(false);

    const handleClose = () => {
        setIsError(false)
        props.setOpen(false);
    };

    //------------------------ Create Team API call -------------------------------//

    // gets value from create team form
    const createTeam = async () => {
        await api.CreateTeam(props.teamName.current?.value)
            .then((resp) => {
                if (resp.data.Success === true) {
                    // sets newTeamID to the TeamID of the created team
                    props.setNewTeamID(resp.data.Data.TeamID);
                    props.setOpen(false);
                    setIsError(false)
                }
            })
            .catch((error) => {
                
                const err: any = error as AxiosError
               
                if (err.response && err.response.status === 409) {
                    setIsError(true)
                }
                else {
        
                    alert("The API is down ROFL!")
                }            
            })
        
    }


    return (
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
                inputRef={props.teamName}
            />
            {isError && <p style={{ color: "red" }}>This Team Already Exist!</p>}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createTeam}>Create </Button>
        </DialogActions>
    </Dialog>
    
  )
}

export default CreateTeamPopUp