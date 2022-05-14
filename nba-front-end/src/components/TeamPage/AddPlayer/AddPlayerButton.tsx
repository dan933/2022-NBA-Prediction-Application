import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
 
const AddPlayerButton = (props: any) => {
  return (
    <>
    <Button
        color={ props.addPlayerButtonColor }
        onClick={ props.handleOpenAddPlayerPopUp }
    >
        <AddCircleOutlineIcon/>
      </Button>
    </>
  )
}
 
export default AddPlayerButton;
