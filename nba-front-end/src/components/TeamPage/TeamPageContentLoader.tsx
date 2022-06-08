import React, { useCallback, useEffect, useState } from 'react';
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

    const getAllTeams = useCallback(async () => {
      const token = await getAccessTokenSilently();

      api.GetAllTeams(token)
        .then((resp) => {
            setAppState({ loading: false, teamList: resp.data.Data as Team[] });
        });
    },[getAccessTokenSilently, setAppState]);
      
      useEffect(() => {
        setAppState({ loading: true, teamList: [] });

        getAllTeams();       
        
      }, [setAppState, getAllTeams]);    
      
  return (
    <>
        <TableLoading isLoading={appState.loading} teamList={appState.teamList} />
    </>
    );

}

export default TeamPageContentLoader;