//testing azure pullrequest pipeline
import { Button } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
 
const RemovePlayerButton = (props: any) => {
  return (
    <>
    <Button
        color="error"
        onClick={ props.handleOpenRemovePlayerPopUp }
    >
        <RemoveCircleOutlineIcon/>
      </Button>
    </>
  )
}
 
export default RemovePlayerButton;
