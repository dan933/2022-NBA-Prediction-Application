import React, { useEffect, useState } from 'react';
import DataGridTeams from './teamDataGrid';
import WithTableLoading from '../componentLoading';
import api from '../../services/api';
import { Team } from '../../models/ITeam';


interface TeamProps{
    loading: boolean;
    teamList: Team[];
}

function FilledTeamTable() {
    const TableLoading = WithTableLoading(DataGridTeams);
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

      //todo useEffect
      useEffect(() => {

      })
    
      
  return (
    <div>
        <TableLoading isLoading={appState.loading} teamList={appState.teamList} />
    </div>
);

}

export default FilledTeamTable;