import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function UserInformation() {
  return (
      <> 
          <ListItemButton>
        <ListItemIcon>
            <AccountBoxIcon />
        </ListItemIcon>
              <ListItemText primary="Account" />    
              </ListItemButton>
    </>
  )
}

export default UserInformation