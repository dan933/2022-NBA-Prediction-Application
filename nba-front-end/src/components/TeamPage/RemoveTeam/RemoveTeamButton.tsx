//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import {read_cookie } from 'sfcookies';
import api from '../../../services/api';
 
const RemoveTeamButton = (props: any) => {

  //Remove Team logic
  const handleopenRemoveTeam = async () => {

    const removeTeamDontAskAgain = read_cookie('removeTeamDontAskAgain')

    // delete_cookie('removeTeamDontAskAgain')

    //if cookie does not exist open remove team popup
    if (removeTeamDontAskAgain !== "1") {
        props.setSelectedTeam(props.teamObject)  
                
        props.setOpenRemoveTeamPopUp((prev:any) => !prev)
    } else {

    //delete team by clicking bin button if there is a cookie
        const res: any = await api.RemoveTeam(props.teamObject.TeamID).catch((err) => {
            console.log(err)
        })
        
      if (res)
      {
        
        api.GetAllTeams().then(resp => {
          props.setTeamList(resp.data.Data);          
        }).catch((err) => { console.log(err) })
        
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
