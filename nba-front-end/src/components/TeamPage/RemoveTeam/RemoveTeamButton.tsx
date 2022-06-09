//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import {read_cookie } from 'sfcookies';
import api from '../../../services/api';
import { useAuth0 } from '@auth0/auth0-react';
 
const RemoveTeamButton = (props: any) => {

  const { getAccessTokenSilently } = useAuth0();

  //Remove Team logic
  const handleopenRemoveTeam = async () => {

    const removeTeamDontAskAgain = read_cookie('removeTeamDontAskAgain')

    // delete_cookie('removeTeamDontAskAgain')

    //if cookie does not exist open remove team popup
    if (removeTeamDontAskAgain !== "1") {
        props.setSelectedTeam(props.teamObject)  
                
        props.setOpenRemoveTeamPopUp((prev:any) => !prev)
    } else {

      const token = await getAccessTokenSilently();
    
    //delete team by clicking bin button if there is a cookie
        const res: any = await api.RemoveTeam(token, props.teamObject.TeamID).catch((err) => {
            console.log(err)
        })
        
      if (res)
      {
        props.setSelectionModel([]);
        props.setNoPopupRemoveTeam(true);
        
      }

    } 
  }

  return (
    <>
    <Button 
        aria-label="Remove Team"        
        color="error"
        onClick={handleopenRemoveTeam}
    >
        <DeleteIcon/>
      </Button>
    </>
  )
}
 
export default RemoveTeamButton;
