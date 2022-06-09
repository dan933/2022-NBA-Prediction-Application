//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {read_cookie } from 'sfcookies';
import api from '../../../services/api';
import { useAuth0 } from '@auth0/auth0-react';

const RemovePlayerButton = (props: any) => {
  const { getAccessTokenSilently } = useAuth0();
  const handleOpenRemovePlayer = async () => {

    const removePlayerDontAskAgain = read_cookie('removePlayerDontAskAgain')

    
    //if cookie does not exist open remove player popup
    if (removePlayerDontAskAgain !== "1") {
      props.setSelectedTeam(props.teamObject)      
      props.setSelectedPlayer(props.PlayerID)
      
      props.setOpenRemovePlayerPopUp((prev:any) => !prev)
        
    } else {

    //delete player by clicking bin button if there is a cookie

        const token = await getAccessTokenSilently();
        
        const res: any = await api.RemovePlayer(token, props.teamObject.TeamID, props.PlayerID).catch((err) => {
            
        })
        
      if (res)
      {
        
        props.tableIsUpdated();
        
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
