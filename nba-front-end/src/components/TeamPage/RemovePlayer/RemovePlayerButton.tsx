//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {read_cookie } from 'sfcookies';
import api from '../../../services/api';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { TeamPageContextType } from '../../../models/ContextModels/TeamPageContextModels';
import { TeamPageContext } from '../../../services/Contexts/TeamPageContext';
import React from 'react';

const RemovePlayerButton: React.FC<any> = (props: any) => {

  const { setPlayerToDelete,teamPlayersList,setTeamPlayersList } = useContext(TeamPageContext) as TeamPageContextType

  const { getAccessTokenSilently } = useAuth0();

  const filterRemovedPlayer = (player:any, playerID:any, teamID:any) => {
    if(player.TeamID === teamID  && player.PlayerID !== playerID){
      return true
    }else{
      return false
    }
  }

  const deletePlayerFromTeam = (playerID:any, teamID:any) => {
    let newTeamList: any = teamPlayersList.filter((player: any) => filterRemovedPlayer(player, playerID, teamID))
    setTeamPlayersList(newTeamList)
    setPlayerToDelete([])
  }

  const handleOpenRemovePlayer = async () => {

    setPlayerToDelete(props.playerObject)

    const removePlayerDontAskAgain = read_cookie('removePlayerDontAskAgain')

    
    //if cookie does not exist open remove player popup
    if (removePlayerDontAskAgain !== "1") {

      setPlayerToDelete(props.playerObject)
      props.setOpenRemovePlayerPopUp((prev:any) => !prev)
        
    } else {

    //delete player by clicking bin button if there is a cookie

        const token = await getAccessTokenSilently();
        
        const res: any = await api.RemovePlayer(token, props.playerObject.TeamID, [props.playerObject.PlayerID]).catch((err) => {
            
        })
        
      if (res)
      {
        
        deletePlayerFromTeam(props.playerObject.PlayerID,props.playerObject.TeamID);
        
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
