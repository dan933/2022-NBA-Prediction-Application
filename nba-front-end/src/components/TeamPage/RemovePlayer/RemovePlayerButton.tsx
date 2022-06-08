//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {read_cookie } from 'sfcookies';
import api from '../../../services/api';
import { useContext } from 'react';

import { TeamPageContext } from '../../../services/Contexts/TeamPageContext';

const RemovePlayerButton: React.FC<any> = (props: any) => { 
  
  const { setPlayerToDelete } = useContext(TeamPageContext)


  const handleOpenRemovePlayer = async () => {

  
    const removePlayerDontAskAgain = read_cookie('removePlayerDontAskAgain')

    
    //if cookie does not exist open remove player popup
    if (removePlayerDontAskAgain !== "1") {
      
      setPlayerToDelete(props.playerObject)
      props.setOpenRemovePlayerPopUp((prev:any) => !prev)
        
    } else {

    //delete player by clicking bin button if there is a cookie
        
        const res: any = await api.RemovePlayer(props.playerObject.TeamID, [props.playerObject.PlayerID]).catch((err) => {
            
        })
        
      if (res)
      {
        setPlayerToDelete({})
        
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
