import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveTeamPopUp from './RemoveTeamPopUp'
import DeleteIcon from '@mui/icons-material/Delete';
 
const RemoveTeamButton = (props: any) => {

  const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = React.useState(false);

  //when component loads for the first time the code below stops the remove team popups from showing
  const [IsLoading, setIsLoading] = React.useState(true);

  //opens remove team popup
  const handleopenRemoveTeamPopUp = () => {
    setOpenRemoveTeamPopUp((prev) => !prev)

    //when component loads for the first time the code below stops the remove team popups from showing
    setIsLoading(false)
  }

  const [removedTeamId, setremovedTeamId] = useState<any>('');

  //this function is passed down to remove team pop up to get the team ID value
  const getRemovedTeamId = (teamID: any) => {
      setremovedTeamId(teamID)      
  }

  useEffect(() => {
    props.getRemovedTeamNumber(removedTeamId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedTeamId])
  


  return (
    <>
    <Button
        color="error"
        onClick={ handleopenRemoveTeamPopUp }
    >
        <DeleteIcon/>
      </Button>
      <RemoveTeamPopUp
        teamObject={props.teamObject}
        handleopenRemoveTeamPopUp={openRemoveTeamPopUp}
        IsLoading={IsLoading}
        getRemovedTeamId={getRemovedTeamId}
      />
    </>
  )
}
 
export default RemoveTeamButton;