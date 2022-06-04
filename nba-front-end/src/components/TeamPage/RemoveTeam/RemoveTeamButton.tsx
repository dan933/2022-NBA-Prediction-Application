//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
 
const RemoveTeamButton = (props: any) => {
  return (
    <>
    <Button 
        aria-label="Remove Team"        
        color="error"
        onClick={ props.handleopenRemoveTeamPopUp }
    >
        <DeleteIcon/>
      </Button>
    </>
  )
}
 
export default RemoveTeamButton;
