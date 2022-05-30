//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import {read_cookie, delete_cookie } from 'sfcookies';
import api from '../../../services/api';
 
const RemoveTeamButton = (props: any) => {

  //Remove Team logic
  const handleopenRemoveTeam = async () => {

    const removeTeamDontAskAgain = read_cookie('removeTeamDontAskAgain')

    // delete_cookie('removeTeamDontAskAgain')

    //if cookie does not exist open remove team popup
    if (removeTeamDontAskAgain !== "1") {
        props.setOpenRemoveTeamPopUp((prev:any) => !prev)
    } else {
    //delete team by clicking button
        const res: any = await api.RemoveTeam(props.teamObject.TeamID).catch((err) => {
            console.log(err)            
        })
        
        api.GetAllTeams().then(resp => {
            props.setTeamList(resp.data.Data);
            if(resp.data.Data.length > 0){
              props.setTeamId([resp.data.Data[0].TeamID])    
            }

            console.log([resp.data.Data[0].TeamID]);
                    
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
