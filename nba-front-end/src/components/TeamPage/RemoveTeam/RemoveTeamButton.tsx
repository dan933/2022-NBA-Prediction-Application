//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import api from '../../../services/api';
 
const RemoveTeamButton = (props: any) => {

  //Remove Team logic
  const handleopenRemoveTeam = async () => {

    const removeTeamDontAskAgain = read_cookie('removeTeamDontAskAgain')

    //if cookie does not exist open remove team popup
    if (removeTeamDontAskAgain !== "1") {
        props.setOpenRemoveTeamPopUp((prev:any) => !prev)
    } else {
    //if cookie exist delete team by clickin button
        const res: any = await api.RemoveTeam(props.teamObject.TeamID).catch((err) => {
            console.log(err)
        })
        
        api.GetAllTeams().then(resp => {
            props.setTeamList(resp.data.Data);            
        }).catch((err) => { console.log(err) })
    } 
  }

  return (
    <>
    <Button
        color="error"
        onClick={handleopenRemoveTeam}
    >
        <DeleteIcon/>
      </Button>
    </>
  )
}
 
export default RemoveTeamButton;
