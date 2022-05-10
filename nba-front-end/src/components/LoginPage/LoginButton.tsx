import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';


const LoginButton = () => {

    const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

    const checkUser = () => {
        if(!isLoading && !isAuthenticated) loginWithRedirect()
    }

    useEffect(() => {
      checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])
    

  return (
      <Button
          style={{ margin: '10px', padding:'10px'}}
        variant="contained"
        onClick={() => checkUser()}
      >
          Login Button
      </Button>
  )
}

export default LoginButton