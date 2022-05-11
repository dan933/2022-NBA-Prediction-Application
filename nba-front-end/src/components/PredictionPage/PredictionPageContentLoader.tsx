import React, { useEffect, useState } from 'react';
import PredictionPageContent from './PredictionPageContent';
import ApiComponentLoader from '../ApiComponentLoader';
import api from '../../services/api';
import { Team } from '../../models/ITeam';


interface TeamProps{
    loading: boolean;
    teamList: Team[];
}

function PredictionPageContentLoader() {
    const TableLoading = ApiComponentLoader(PredictionPageContent);
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

export default PredictionPageContentLoader;