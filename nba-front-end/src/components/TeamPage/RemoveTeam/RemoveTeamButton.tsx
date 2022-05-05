import { Button } from '@mui/material'
import React from 'react'
import RemoveTeamPopUp from './RemoveTeamPopUp'
 
const RemoveTeamButton = (props:any) => {
  return (
    <>
    <Button
        variant="contained"
        color="error"
        onClick={() => {
            console.log(props)
        }}
    >
        Remove
    </Button>
    <RemoveTeamPopUp
      teamName={props.TeamName}
    />
    </>
  )
}
 
export default RemoveTeamButton;