import React, { useRef, useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";

interface TeamPlayerProps {
  teamPlayerList: any[];
}

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = (props) => {

  const teamID = props.teamID;
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [isLoading, setLoading] = useState(false);
  
  // gets value from create team form

  useEffect(() => {
    if (!isLoading && teamID.length !== 0) {
      setLoading(true);
      setAppState({ teamPlayerList: [] });
      axios.get(`${url}/team/${teamID}/get-players`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAppState, teamID, props.isUpdated]);
  
  const yourLineUpSection = () => {
    if (!isLoading && teamID.length === 0) {
      return (
        <h1>Please select a team</h1>
      )
    } else {
      return (
        <TeamPlayerTable loading={isLoading} teamPlayerList={appState.teamPlayerList} teamID={teamID} tableIsUpdated={props.tableIsUpdated}/>
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
