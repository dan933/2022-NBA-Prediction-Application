import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import api from '../../../services/api';
import { useAuth0 } from '@auth0/auth0-react';

export default function RemoveTeamPopUp(props: any) {

  interface ITeam {
    TeamID?: number;
    TeamName?: string;
  }

  const { getAccessTokenSilently } = useAuth0();

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
    
    const token = await getAccessTokenSilently();
    console.log(token);

    const res:any = await api.RemoveTeam(token, teamObject.TeamID).catch((err) => {
      setIsError(true)
    })    
    
    if(res) props.setOpenRemoveTeamPopUp(false);
  }
  

    return(
        <Dialog id="RemoveTeam" open={props.openRemoveTeamPopUp} disableScrollLock={true}>
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
    )
}