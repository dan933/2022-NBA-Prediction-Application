import React, { SyntheticEvent, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Checkbox } from '@mui/material';
import api from '../../../services/api';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

export default function RemovePlayerPopUp(props: any) {
  console.log(props)

  interface ITeam {
    TeamID?: number;
    PlayerID?: number[];
    FirstName?: string;
    LastName?: string; 
  }

  const [teamObject, setTeamObject] = React.useState<ITeam>({TeamID:0,PlayerID:[0],FirstName:"",LastName:""});

  const [IsError, setIsError] = React.useState(false);
  
  const [IsCookieEnabled, setIsCookieEnabled] = useState(false)

  useEffect(() => {
    // setTeamObject(props.teamList.find((team: any) => team.TeamID === props.teamId[0] ))    
    setTeamObject(props.teamPlayerList.find((player: any) => player.PlayerID === props.PlayerID[0] ))   
  }, [props.playerList, props.PlayerID, teamObject])

  const handleDontAskAgainCheckbox = () => {
    setIsCookieEnabled(prev => !prev)    
  }

  

  //
  
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

    console.log(props.SelectedPlayer)
    
    //removes selected player
    const res:any = await api.RemovePlayer(props.SelectedTeam.TeamID, props.SelectedPlayer).catch((err) => {
      
      setIsError(true)
      
    })
    
    if(res)
    
    props.setOpenRemovePlayerPopUp(false)
    props.tableIsUpdated();
    
    
  }  

    return(
        <Dialog id="RemovePlayer" open={props.openRemovePlayerPopUp}>
              {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {props.SelectedTeam?.FirstName} {props.SelectedTeam?.LastName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to remove {props.SelectedTeam?.FirstName} {props.SelectedTeam?.LastName}?
          </DialogContentText>
          {IsError && <Alert severity="error">We are sorry the API is currently down</Alert>}
              </DialogContent>
              <DialogActions >
              <FormControlLabel control={<Checkbox />} id="checkbox" onChange={ e => handleDontAskAgainCheckbox() } style={{marginRight: "30%"}} label="Don't ask again" />
                <Button onClick={closeRemovePlayerPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemovePlayer}>Continue </Button>
              </DialogActions>
        </Dialog>
    )
}