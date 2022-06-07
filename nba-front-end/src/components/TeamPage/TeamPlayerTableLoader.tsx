import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import axios from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = (props) => {
  const [teamPlayersList, setAppState] = [props.teamPlayersList, props.setTeamPlayersList];
  const [isLoading, setLoading] = useState(false);
  
  // gets value from create team form

  const setTeamPlayersIDList=props.setTeamPlayersIDList;
  const setIsUpdated=props.setIsUpdated;
  const updatePlayerTable = useCallback(
    () => {
      if (!isLoading && props.teamID.length !== 0) {
      setLoading(true);
      setAppState([]);
      axios.get(`${url}/team/${props.teamID}/get-players`)
        .then((response) => {
            setAppState(response.data.Data as TeamPlayer[]);
            setTeamPlayersIDList(response.data.Data.map((a:any)=>a.PlayerID));
            setLoading(false);
            setIsUpdated(false);
          })
      // this catches any errors that may occur while fetching for player data
            .catch(error => { 
            console.log(error); 
            setLoading(false);
          })
        }
    },
    [props.teamID, isLoading, setAppState, setTeamPlayersIDList, setIsUpdated, setLoading],
  )
  

  useEffect(() => {

    if(props.isUpdated || teamPlayersList.length===0){
      
        updatePlayerTable();

    }
    }, [props.isUpdated, teamPlayersList, updatePlayerTable]);
  
  const yourLineUpSection = () => {
    if (!isLoading && props.teamID.length === 0) {
      return (
        <h1>Please select a team</h1>
      )
    } else {
      return (
        <TeamPlayerTable loading={isLoading} teamPlayerList={teamPlayersList} teamID={props.teamID} tableIsUpdated={props.tableIsUpdated}/>
      )
    }
  }

  return (
    <>
      {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
      {yourLineUpSection()}
    </>
  );
};

export default TeamPlayerTableLoader;
