import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import './UserInformationMenu.css';

function UserInformation() {

  const { user, logout } = useAuth0();

  const userEmail = user?.email

  // sets events for profile menu
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <> 
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} color="secondary" aria-label="upload picture" component="span">
            <span className='user-logo'>{userEmail?.slice(0,1).toLocaleUpperCase()}</span>
        </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">{user?.email}</Typography>
      </MenuItem>
      <MenuItem onClick={ () => {logout()} }>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </Menu>    
  </>
  )
}

export default UserInformation