import React, { SyntheticEvent, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Checkbox } from '@mui/material';
import api from '../../../services/api';
import TeamList from '../TeamList';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

export default function RemoveTeamPopUp(props: any) {
  
  
  interface ITeam {
    TeamID?: number;
    TeamName?: string;
  }

  const [teamObject, setTeamObject] = React.useState<ITeam>({ TeamID: 0, TeamName: "" });

  // used for remove team don't ask again checkbox
  const [IsCookieEnabled, setIsCookieEnabled] = useState(false)

  const handleDontAskAgainCheckbox = () => {
    setIsCookieEnabled(prev => !prev)    
  }
  
  useEffect(() => {
    setTeamObject(props.teamList.find((team: any) => team.TeamID === props.teamId[0]))    
  }, [props.teamList, props.teamId, teamObject])

  const [IsError, setIsError] = React.useState(false);   
  const closeRemoveTeamPopup = () => {
    props.setOpenRemoveTeamPopUp(false);
    setIsError(false)
     }

  
  const handleClickConfirmRemoveTeam = async () => {
    //sets cookie if checkbox is clicked on confirm
    if (IsCookieEnabled)
    {      
      bake_cookie('removeTeamDontAskAgain', "1");
    }
    
    //removes selected team
    const res:any = await api.RemoveTeam(props.teamId)
    .catch((err) => {
      setIsError(true)
    })
     
    if(res) 
    props.setOpenRemoveTeamPopUp(false) 
    props.tableIsUpdated();
    
    

    //props.teamList.find(team => team)
    

  }
    return(
        <Dialog id="RemoveTeam" open={props.openRemoveTeamPopUp}>
              {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You'll lose all data relating to {props.SelectedTeam?.TeamName}.

                  Are you sure you want to permanently delete this team?
          </DialogContentText>
          {IsError && <Alert severity="error">We are sorry the API is currently down</Alert>}
              </DialogContent>
              <DialogActions >
              <FormControlLabel control={<Checkbox />} id="checkbox" onChange={ e => handleDontAskAgainCheckbox() } style={{marginRight: "45%"}} label="Don't ask again" /> 
                <Button onClick={closeRemoveTeamPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemoveTeam}>Continue </Button>
              </DialogActions>
        </Dialog>
    )
  
}