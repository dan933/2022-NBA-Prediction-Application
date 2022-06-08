import React, { useCallback, useContext, useRef, useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";

import { SelectionContext } from '../../services/Contexts/SelectionContext';



interface TeamPlayerProps {
  teamPlayerList: any[];
}

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = (props) => {

  //This Object has the current selected team which will be used to get the players from that team.
  const { teamSelectionModel } = useContext(SelectionContext)

  const { setSelectedPlayersID } = useContext(SelectionContext)
  const { playerToDelete } = useContext(SelectionContext)
  
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [isLoading, setLoading] = useState(false);
  
  // gets value from create team form

  useEffect(() => {
    if (teamSelectionModel.TeamID !== (null || undefined)) {
      setLoading(true);
      setAppState({ teamPlayerList: [] });
      axios.get(`${url}/team/${teamSelectionModel.TeamID}/get-players`)
        .then((response) => {
            setAppState({ teamPlayerList: response.data.Data as TeamPlayer[] });            
            setLoading(false);
            props.setIsUpdated(false);
          })
      // this catches any errors that may occur while fetching for player data
            .catch(error => { 
            console.log(error); 
            setLoading(false);
          })
        }
    }, [teamSelectionModel.TeamID, playerToDelete ]);
  
  const yourLineUpSection = () => {
    if (!isLoading && teamSelectionModel.TeamID === null) {
      return (
        <h1>Please select a team</h1>
      )
    } else {
      return (
        <TeamPlayerTable loading={isLoading} teamPlayerList={appState.teamPlayerList} teamID={props.teamID} tableIsUpdated={props.tableIsUpdated}/>
      )
    }
  }

  return (
    <React.Fragment>
      <div>
        {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        {yourLineUpSection()}
      </div>
    </React.Fragment>
  );
};

export default TeamPlayerTableLoader;
