import React, { useRef, useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";
import { useAuth0 } from "@auth0/auth0-react";

interface TeamPlayerProps{
    teamPlayerList: any[];
}

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = (props) => {

  const teamID = props.teamID;
  const TableLoading = (TeamPlayerTable);
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [isLoading, setLoading] = useState(false);
  const isUpdated = props.isUpdated;
  const setIsUpdated = props.setIsUpdated;

  const { getAccessTokenSilently } = useAuth0();
  
  // gets value from create team form

  const getPlayersFromTeam = async () => {



    if (teamID.length !== 0) {

      const token = await getAccessTokenSilently();

      console.log(token)

      setLoading(true);
      setAppState({ teamPlayerList: [] });

      api.get(`${url}/team/${teamID}/get-players`, token).subscribe({
        next: (resp: any) => {         

          setLoading(false);
          setAppState({ teamPlayerList: resp.Data as TeamPlayer[] });
          setIsUpdated(false);

        },
        error: (e) => {
          console.log(e);
          setLoading(false);
        }
      })
    }

  }

  

  useEffect(() => {
  getPlayersFromTeam();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAppState, teamID, isUpdated]);
  
  const yourLineUpSection = () => {
    if (isLoading && teamID.length !== 0) {
      return (
        <h1>Hold on, fetching data may take some time :)</h1>
      )
    } else if (!isLoading && teamID.length === 0) {
      return (
        <h1>Please select a team</h1>
      )
    } else {
      return (
        <TableLoading teamPlayerList={appState.teamPlayerList} teamID={teamID} tableIsUpdated={props.tableIsUpdated}/>
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
