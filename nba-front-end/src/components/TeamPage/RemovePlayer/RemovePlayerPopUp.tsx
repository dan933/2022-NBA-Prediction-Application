import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Checkbox } from '@mui/material';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import api from '../../../services/api';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { TeamPageContext } from '../../../services/Contexts/TeamPageContext';

const PopUpAlert = React.forwardRef<HTMLDivElement, AlertProps>(function PopUpAlert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RemovePlayerPopUp(props: any) {

  const { playerToDelete } = useContext<any>(TeamPageContext)
  const { setPlayerToDelete } = useContext<any>(TeamPageContext)

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

  const [IsError, setIsError] = React.useState(false);
  
  const [IsCookieEnabled, setIsCookieEnabled] = useState(false)

  const handleDontAskAgainCheckbox = () => {
    setIsCookieEnabled(prev => !prev)    
  }

  
  const closeRemovePlayerPopup = () => {
    props.setOpenRemovePlayerPopUp(false);
    setIsError(false)
  }

  const handleClickConfirmRemovePlayer = async () => {
    //sets cookie if checkbox is clicked on confirm
    if (IsCookieEnabled)
    {      
      bake_cookie('removePlayerDontAskAgain', "1");
    }

    //removes selected player
    const res: any = await api.RemovePlayer(playerToDelete.TeamID, [playerToDelete.PlayerID]).catch((err) => {      
      setIsError(true)
    })
    
    if(res)
    setPlayerToDelete([])
    props.setOpenRemovePlayerPopUp(false)    
    openRemovePlayerSnackBar();
  }
  

    return(
        <div>
        <Dialog id="RemovePlayer" open={props.openRemovePlayerPopUp}>              
              <DialogTitle>Remove {playerToDelete.FirstName} {playerToDelete.LastName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to remove {playerToDelete.FirstName} {playerToDelete.LastName} ?
          </DialogContentText>
          {IsError && <Alert severity="error">We are sorry the API is currently down</Alert>}
              </DialogContent>
              <DialogActions >
              <FormControlLabel control={<Checkbox />} id="checkbox" onChange={ e => handleDontAskAgainCheckbox() } style={{marginRight: "30%"}} label="Don't ask again" />
                <Button onClick={closeRemovePlayerPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemovePlayer}>Continue </Button>
              </DialogActions>  
        </Dialog>

        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={1050} onClose={handleClose}>
        <PopUpAlert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Player Successfully Removed!
        </PopUpAlert>
        </Snackbar>
        </Stack>
        </div>
    )
}