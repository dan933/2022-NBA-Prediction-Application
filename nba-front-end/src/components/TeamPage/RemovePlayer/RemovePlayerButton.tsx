//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {read_cookie } from 'sfcookies';
import api from '../../../services/api';

const RemovePlayerButton = (props: any) => {
  const handleOpenRemovePlayer = async () => {
    console.log(3)
    const removePlayerDontAskAgain = read_cookie('removePlayerDontAskAgain')

    
    //if cookie does not exist open remove player popup
    if (removePlayerDontAskAgain !== "1") {
        console.log(removePlayerDontAskAgain)
        props.setOpenRemovePlayerPopUp((prev:any) => !prev)
    } else {

    //delete player by clicking bin button if there is a cookie
        const res: any = await api.RemovePlayer(props.teamObject.TeamID, props.PlayerID).catch((err) => {
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
        color="error"
        onClick={ handleOpenRemovePlayer }
    >
        <RemoveCircleOutlineIcon/>
      </Button>
    </>
  )
}
 
export default RemovePlayerButton;
