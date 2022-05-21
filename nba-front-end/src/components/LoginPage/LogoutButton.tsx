import {ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutIcon from '@mui/icons-material/Logout';

function LogoutButton() {
    const { logout } = useAuth0();
    return (
        <>  
        <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItemButton>
        </>
     
   
  )
}

export default LogoutButton