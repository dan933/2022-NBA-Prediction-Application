import React, { useEffect } from 'react';
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

  const [teamObject, setTeamObject] = React.useState<ITeam>({TeamID:0,TeamName:""});
  
  useEffect(() => {
    setTeamObject(props.teamList.find((team: any) => team.TeamID === props.teamId[0]))    
  }, [props.teamList, props.teamId, teamObject,props.cookieEnabled])

  const [IsError, setIsError] = React.useState(false);
  
  const closeRemoveTeamPopup = () => {
    props.setOpenRemoveTeamPopUp(false);
    setIsError(false)
     }

  //--------------------------- Remove Team api call ---------------------------//
  
  const handleClickConfirmRemoveTeam = async (TeamID:any) => {
    console.log(teamObject.TeamID);
    const res:any = await api.RemoveTeam(TeamID).catch((err) => {
      setIsError(true)
    })    
    
    if(res) 
    props.setOpenRemoveTeamPopUp(false)
    
  }
    
  
  const handleRemoveTeamCookies = async () => {
      const cookie_key = 'askAgain'; 
      const cookie = read_cookie(cookie_key) 
    
        if (cookie == "1") {
        
        handleClickConfirmRemoveTeam(teamObject.TeamID);
      }
    }
    
    useEffect(()=>{
      console.log(props.teamId)    
      if (props.teamId && props.teamId.length === 1) {
        handleRemoveTeamCookies();
      }
    },[props.cookieEnabled])
    
  

    return(
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
              <FormControlLabel control={<Checkbox />} id="checkbox" onChange={ e => props.handleopenRemoveTeamPopUp(e)} style={{marginRight: "45%"}} label="Don't ask again" /> 
                <Button onClick={closeRemoveTeamPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemoveTeam}>Continue </Button>
              </DialogActions>
        </Dialog>
    )
}