import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'

function GetTeams() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
    const getToken = async () => {
        const token = await getAccessTokenSilently();
        console.log(token)   
    }

    getToken()

    
      return (
          <div>
              
        </div>
      );
};

export default GetTeams