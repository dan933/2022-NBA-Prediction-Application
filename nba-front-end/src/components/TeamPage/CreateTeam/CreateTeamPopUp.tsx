import { useAuth0 } from '@auth0/auth0-react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { AxiosError } from 'axios';
import { useState, useEffect, forwardRef, useContext, useRef } from 'react'
import api from '../../../services/api';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { TeamPageContext } from '../../../services/Contexts/TeamPageContext';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const teamNameMaxSize = 35;

function CreateTeamPopUp(props: any) {
  
  const {  setTeamSelectionModel } = useContext(TeamPageContext)
  
    const teamName = useRef<HTMLInputElement | null>(null) //creating a refernce for TextField Component

    const [teamNameSize, setTeamNameSize] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [apiErrorMessage, setApiErrorMessage] = useState("");

    
    
    // sets error message and displays it to user upon reaching char limit
    useEffect(() => { 
        if (teamNameSize.length >= teamNameMaxSize) {
          setErrorMessage(
            "Team Name has reached the maximum number of characters"
          );
        }
      }, [teamNameSize]);

      useEffect(() => {
        // sets Error message as empty if input is less than char limit
        if (teamNameSize.length < teamNameMaxSize && errorMessage) {
          setErrorMessage("");
        }
      }, [teamNameSize, errorMessage]);
    
    const [isError, setIsError] = useState(false);

    const handleClose = () => {
        setIsError(false)
        props.setOpen(false);
    };
    
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const openCreateTeamSnackBar = () => {
      setOpenSnackBar(true);
    };

    const handleCreateTeamSnackBarClose = () => {
      setOpenSnackBar(false);
    }
    const { getAccessTokenSilently  } = useAuth0();

    //------------------------ Create Team API call -------------------------------//

    // gets value from create team form
    const createTeam = async () => {

        const token = await getAccessTokenSilently();

        await api.CreateTeam(token, teamName.current?.value)
            .then((resp) => {                
                if (resp.data.Success === true) {
                  // sets newTeamID to the TeamID of the created team                  
                  setTeamSelectionModel(resp.data.Data);                  
                    props.setOpen(false);
                    setIsError(false);
                    openCreateTeamSnackBar()
                    // removes error message on next pop up
                    setErrorMessage("")
                }
                
            })
            .catch((error:any) => {
                
                const err: any = error as AxiosError

                if ((err.response && err.response.status === 409) && err.response.data.Message != 'Team Name cannot be Null' ) {
                    setIsError(true)
                    setApiErrorMessage(err.response.data.Message)
                }
                else if (err.response && err.response.status === 409){
                  setIsError(true)
                  setApiErrorMessage(err.response.data.Message)
                }else{

                  alert("The API is down.")
                  
                }            
            })
        
    }


    return (
        <>
        <Dialog id="createTeam" open={props.open} onClose={handleClose} disableScrollLock={true}>
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
                inputProps={{
                    maxLength: teamNameMaxSize
                  }}  
                helperText={errorMessage}
                onChange={(e) => setTeamNameSize(e.target.value)}
            />
            {isError && <p style={{ color: "red" }}>{apiErrorMessage}</p>}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={createTeam}>Create </Button>
        </DialogActions>
    </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleCreateTeamSnackBarClose}>
      <Alert onClose={handleCreateTeamSnackBarClose} severity="info" sx={{ width: '100%' }}>
        Team Successfully Added!!
      </Alert>
      </Snackbar>
      </Stack>
      </>
  )
}

export default CreateTeamPopUp