import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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

export default function RemovePlayerPopUp(props: any) {

  interface ITeam {
    TeamID?: number;
    PlayerID?: number[];
    FirstName?: string;
    LastName?: string; 
  }
  const [open, setOpen] = React.useState(false);

  const openRemovePlayerSnackBar = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [teamObject, setTeamObject] = React.useState<ITeam>({TeamID:0,PlayerID:[0],FirstName:"",LastName:""});

  const [IsError, setIsError] = React.useState(false);
  
  const closeRemovePlayerPopup = () => {
    props.setOpenRemovePlayerPopUp(false);
    setIsError(false)
  }


  useEffect(() => {
    // setTeamObject(props.teamList.find((team: any) => team.TeamID === props.teamId[0] ))    
    setTeamObject(props.teamPlayerList.find((player: any) => player.PlayerID === props.PlayerID[0] ))   
  }, [props.playerList, props.PlayerID, teamObject])
    //--------------------------- Remove Team api call ---------------------------//
  const handleClickConfirmRemovePlayer = async () => {
    const res:any = await api.RemovePlayer(props.teamId, props.PlayerID).catch((err) => {
      setIsError(true)
      
    })    
    
    if(res) 
    props.setOpenRemovePlayerPopUp(false);
    props.tableIsUpdated();
    openRemovePlayerSnackBar();
  }
  

    return(
        <div>
        <Dialog id="RemovePlayer" open={props.openRemovePlayerPopUp}>
        {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {teamObject?.FirstName} {teamObject?.LastName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to remove {teamObject?.FirstName} {teamObject?.LastName}?
          </DialogContentText>
          {IsError && <Alert severity="error">We are sorry the API is currently down</Alert>}
              </DialogContent>
              <DialogActions >
                <Button onClick={closeRemovePlayerPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemovePlayer}>Continue </Button>
              </DialogActions>  
        </Dialog>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={850} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Player Successfully Removed!
        </Alert>
        </Snackbar>
        </Stack>
        </div>
    )
}