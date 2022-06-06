import React, { useEffect, useState } from 'react';
import TeamPageContent from './TeamPageContent';
import ApiComponentLoader from '../ApiComponentLoader';
import api from '../../services/api';
import { Team } from '../../models/ITeam';
import { SelectionContext } from '../../services/Contexts/SelectionContext';



interface TeamProps{
    loading: boolean;
    teamList: Team[];
}

function TeamPageContentLoader() {

  const [SelectionModel, setSelectionModel] = useState<any>({
    Team:{TeamName:"wooo",TeamID:1}
})
    const TableLoading = ApiComponentLoader(TeamPageContent);
    const [appState, setAppState] = useState<TeamProps>({
        loading: true,
        teamList: [],
      });

      
      useEffect(() => {
        setAppState({ loading: true, teamList: [] });
        api.GetAllTeams()
        .then((resp) => {
            setAppState({ loading: false, teamList: resp.data.Data as Team[] });
        })
      }, [setAppState]);
      
  return (
    <SelectionContext.Provider value={{ SelectionModel, setSelectionModel }}>
      <TableLoading
          isLoading={appState.loading}
          teamList={appState.teamList}
      />
    </SelectionContext.Provider>
    );

}

export default TeamPageContentLoader;