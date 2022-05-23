import React, { useEffect, useState } from 'react';
import TeamPageContent from './TeamPageContent';
import ApiComponentLoader from '../ApiComponentLoader';
import api from '../../services/api';
import { Team } from '../../models/ITeam';
import { useAuth0 } from '@auth0/auth0-react';


interface TeamProps{
    loading: boolean;
    teamList: Team[];
}



function TeamPageContentLoader() {
    const TableLoading = ApiComponentLoader(TeamPageContent);
    const [appState, setAppState] = useState<TeamProps>({
        loading: true,
        teamList: [],
      });

      const { getAccessTokenSilently } = useAuth0();

      const getAllTeams = async () => {
        const token = await getAccessTokenSilently();

        api.get('/team/get-all',
        {
            Headers:
            {
              'Authorization':`Bearer ${token}`
            }  
        })
        .subscribe((resp) => {
            setAppState({ loading: false, teamList: resp as Team[] });
          });

      }

      useEffect(() => {
        getAllTeams()
        setAppState({ loading: true, teamList: [] });
        
        
      }, [setAppState]);    
      
  return (
    <div>
        <TableLoading isLoading={appState.loading} teamList={appState.teamList} />
    </div>
    );

}

export default TeamPageContentLoader;