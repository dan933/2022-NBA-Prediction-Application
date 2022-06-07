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
  const { SelectionModel } = useContext(SelectionContext)
  
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [isLoading, setLoading] = useState(false);
  
  // gets value from create team form

  useEffect(() => {
    console.log(SelectionModel)
    if (SelectionModel.TeamID !== (null || undefined)) {
      setLoading(true);
      setAppState({ teamPlayerList: [] });
      axios.get(`${url}/team/${SelectionModel.TeamID}/get-players`)
        .then((response) => {
            setAppState({ teamPlayerList: response.data.Data as TeamPlayer[] });
            props.setTeamPlayersList(response.data.Data.map((a:any)=>a.PlayerID));
            setLoading(false);
            props.setIsUpdated(false);
          })
      // this catches any errors that may occur while fetching for player data
            .catch(error => { 
            console.log(error); 
            setLoading(false);
          })
        }
    }, [SelectionModel.TeamID]);
  
  const yourLineUpSection = () => {
    if (!isLoading && SelectionModel.TeamID === null) {
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
