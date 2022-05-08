import React, { useEffect, useState } from 'react';
import TeamPageContent from './TeamPageContent';
import ApiComponentLoader from '../ApiComponentLoader';
import api from '../../services/api';
import { Team } from '../../models/ITeam';


interface TeamProps{
    loading: boolean;
    teamList: Team[];
}

function TeamPageContentLoader() {
    const TableLoading = ApiComponentLoader(TeamPageContent);
    const [appState, setAppState] = useState<TeamProps>({
        loading: false,
        teamList: [],
      });

      
      useEffect(() => {
        setAppState({ loading: true, teamList: [] });
        api.get('/team/get-all').subscribe((resp) => {
            setAppState({ loading: false, teamList: resp as Team[] });
          });
      }, [setAppState]);    
      
  return (
    <div>
        <TableLoading isLoading={appState.loading} teamList={appState.teamList} />
    </div>
    );

}

export default TeamPageContentLoader;