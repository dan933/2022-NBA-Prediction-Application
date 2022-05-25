import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import api from '../../../services/api';

export default function RemovePlayerPopUp(props: any) {

  interface ITeam {
    TeamID?: number;
    PlayerID?: number[];
    PlayerName?: string;
  }

  const [teamObject, setTeamObject] = React.useState<ITeam>({TeamID:0,PlayerID:[0],PlayerName:""});

  const [IsError, setIsError] = React.useState(false);
  
  const closeRemovePlayerPopup = () => {
    props.setOpenRemovePlayerPopUp(false);
    setIsError(false)
  }

  //--------------------------- Remove Team api call ---------------------------//
  const handleClickConfirmRemovePlayer = async () => {
    const res:any = await api.RemovePlayer(props.teamId, props.PlayerID).catch((err) => {
      setIsError(true)
      
    })    
    
    if(res) 
    props.setOpenRemovePlayerPopUp(false);
    props.tableIsUpdated();
  }
  

    return(
        <Dialog id="RemovePlayer" open={props.openRemovePlayerPopUp}>
              {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {teamObject?.PlayerName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to remove {teamObject?.PlayerName}?
          </DialogContentText>
          {IsError && <Alert severity="error">We are sorry the API is currently down</Alert>}
              </DialogContent>
              <DialogActions >
                <Button onClick={closeRemovePlayerPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemovePlayer}>Continue </Button>
              </DialogActions>
        </Dialog>
    )
}