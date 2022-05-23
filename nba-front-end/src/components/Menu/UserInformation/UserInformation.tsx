import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useAuth0 } from '@auth0/auth0-react';
import './UserInformation.css'

function UserInformation() {

  const { user } = useAuth0(); 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <> 
      <ListItemButton
        style={{padding:'0px'}}
      >
        <Button
          style={{width:'100%', color:'black', display:'flex', justifyContent:'flex-start'}}  
           id="demo-positioned-button"
           aria-controls={open ? 'demo-positioned-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
        >
          <div >
              <div className='blue-circle'>{user?.name && user.email?.slice(0,2) }</div>
          </div>
          <div>
            <div style={{textOverflow:'ellipsis'}} className='full-email'>{user?.email}</div>
          </div>
        </Button>
        
      </ListItemButton>
      <Menu        
        disableScrollLock={true}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}      
      >
        <MenuItem
        sx={{backgroundColor:'white'}}  
          onClick={handleClose}
        >
          <div style={{ display: 'flex',flexDirection:'column' }}>
            <div>{user?.name !== user?.email ? user?.name: null}</div>
            <div>{user?.email}</div>
          </div>
        </MenuItem>
      </Menu>
      
  </>
  )
}

export default UserInformation