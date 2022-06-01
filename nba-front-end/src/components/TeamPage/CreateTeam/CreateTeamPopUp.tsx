import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { AxiosError } from 'axios';
import React, { useRef } from 'react'
import api from '../../../services/api';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateTeamPopUp(props:any) {

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
    const createTeam = async () => {
        await api.CreateTeam(props.teamName.current?.value)
            .then((resp) => {
                if (resp.data.Success === true) {
                    // sets newTeamID to the TeamID of the created team
                    props.setNewTeamID(resp.data.Data.TeamID);
                    props.setOpen(false);
                    setIsError(false);
                    openRemoveTeamSnackBar()
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
                inputRef={props.teamName}
            />
            {isError && <p style={{ color: "red" }}>This Team Already Exist!</p>}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createTeam}>Create </Button>
        </DialogActions>
    </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={550} onClose={handleSnackBarClose}>
      <Alert onClose={handleSnackBarClose} severity="info" sx={{ width: '100%' }}>
        Team Successfully Added!!
      </Alert>
      </Snackbar>
      </Stack>
      </div>
  )
}

export default CreateTeamPopUp