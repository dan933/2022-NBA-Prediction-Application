import { Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddPlayerButton = (props: any) => {
  return (
    <>
    <Button
        color= "success"
        onClick={ props.handleAddPlayer }
        disabled={ props.disabled }
    >
        <AddCircleOutlineIcon/>
      </Button>
    </>
  )
}
 
export default AddPlayerButton;
