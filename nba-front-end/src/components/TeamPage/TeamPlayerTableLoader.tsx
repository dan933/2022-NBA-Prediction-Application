import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import { axiosRequestConfiguration } from "../../services/axios_config";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../services/api";

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = (props) => {
  const [teamPlayersList, setTeamPlayersList] = [props.teamPlayersList, props.setTeamPlayersList];
  const [isLoading, setLoading] = useState(false);
  
  const { getAccessTokenSilently } = useAuth0();
  
  // gets value from create team form

  const setTeamPlayersIDList=props.setTeamPlayersIDList;
  const setIsUpdated=props.setIsUpdated;
  const updatePlayerTable = useCallback(
    async () => {
      const token = await getAccessTokenSilently();

      if (!isLoading && props.teamID.length !== 0) {
      setLoading(true);
      // setTeamPlayersList([]);
      api.get(`${url}/team/${props.teamID}/get-players`, token)
        .toPromise().then((response:any) => {
            setTeamPlayersList(response.Data as TeamPlayer[]);
            setTeamPlayersIDList(response.Data.map((a:any)=>a.PlayerID));
            setLoading(false);
            setIsUpdated(false);
          })
          // this catches any errors that may occur while fetching for player data
          .catch(error => { 
            console.log(error); 
            setLoading(false);
          })
      }
    }
  ,
    [props.teamID, getAccessTokenSilently, isLoading, setTeamPlayersList, setTeamPlayersIDList, setIsUpdated, setLoading],
  )
  

  useEffect(() => {

    if(props.isUpdated){
      
        updatePlayerTable();

    }
    }, [props.isUpdated, updatePlayerTable]);
  
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
