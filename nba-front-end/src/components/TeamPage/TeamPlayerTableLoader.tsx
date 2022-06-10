import React, { useCallback, useState, useContext } from "react";
import { useEffect } from "react";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import { axiosRequestConfiguration } from "../../services/axios_config";
import { useAuth0 } from "@auth0/auth0-react";
import api from "../../services/api";
import { TeamPageContext } from '../../services/Contexts/TeamPageContext';

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = () => {

  const { setTeamPlayersList, teamSelectionModel } = useContext(TeamPageContext)
  
  const [isLoading, setLoading] = useState(false);
  
  const { getAccessTokenSilently } = useAuth0();

  const isTeamSelected = (teamValue: number | undefined) => {
    return typeof teamValue ==='number'
  }

  const updatePlayerTable =
    async () => {      
      const token = await getAccessTokenSilently();
      if (isTeamSelected(teamSelectionModel.TeamID)) {
      setLoading(true);      
        api.get(`${url}/team/${teamSelectionModel.TeamID}/get-players`, token)
          .subscribe({
            next: (resp: any) => {            
              setTeamPlayersList(resp.Data);
              setLoading(false);
            },
            error: (err) => {
              console.log(err); 
              setLoading(false);
            }
        })
      }
    }
  

  useEffect(() => {
    updatePlayerTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamSelectionModel]);
  
  const yourLineUpSection = () => {
    if (!teamSelectionModel.TeamID) {
      return (
        <h1>Please select a team</h1>
      )
    } else {
      return (
        <TeamPlayerTable
          loading={isLoading}          
        />
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
