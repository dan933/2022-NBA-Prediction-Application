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

export default function RemoveTeamPopUp(props: any) {

  interface ITeam {
    TeamID?: number;
    TeamName?: string;
  }
  const [open, setOpen] = React.useState(false);

  const openAddTeamSnackBar = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [teamObject, setTeamObject] = React.useState<ITeam>({TeamID:0,TeamName:""});
  
  useEffect(() => {
    setTeamObject(props.teamList.find((team: any) => team.TeamID === props.teamId[0]))    
  }, [props.teamList, props.teamId, teamObject])

  const [IsError, setIsError] = React.useState(false);
  
  const closeRemoveTeamPopup = () => {
    props.setOpenRemoveTeamPopUp(false);
    setIsError(false)
  }

  //--------------------------- Remove Team api call ---------------------------//
  const handleClickConfirmRemoveTeam = async () => {
    const res:any = await api.RemoveTeam(teamObject.TeamID).catch((err) => {
      setIsError(true)
    })    
    
    if(res) 
    props.setOpenRemoveTeamPopUp(false)
    openAddTeamSnackBar()
  }
  


    return(
      <div> 
        <Dialog id="RemoveTeam" open={props.openRemoveTeamPopUp}>
              {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {teamObject?.TeamName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You'll lose all data relating to {teamObject?.TeamName}.

                  Are you sure you want to permanently delete this team?
          </DialogContentText>
          {IsError && <Alert severity="error">We are sorry the API is currently down</Alert>}
              </DialogContent>
              <DialogActions >
                <Button onClick={closeRemoveTeamPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemoveTeam}>Continue </Button>
              </DialogActions>
        </Dialog>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={1050} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Team Successfully Removed!
        </Alert>
        </Snackbar>
        </Stack>
      </div>
    )
}