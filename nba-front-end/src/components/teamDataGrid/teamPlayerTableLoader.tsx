import React, { useRef, useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { TeamPlayer } from '../../models/ITeamPlayer';
import DataGridTeamPlayers from './teamPlayerDataGrid';
import axios, { AxiosError } from 'axios';
import { axiosRequestConfiguration } from "../../services/axios_config";

interface TeamPlayerProps{
    teamPlayerList: any[];
}

const url = axiosRequestConfiguration.baseURL

const FilledTeamPlayerTable: React.FC<any> = (props) => {

  const teamID = props.teamID;
  const TableLoading = (DataGridTeamPlayers);
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [isLoading, setLoading] = useState(false);
  const isUpdated = props.isUpdated;
  const setIsUpdated = props.setIsUpdated;
  
  // gets value from create team form

    useEffect(() => {
        setLoading(true);
        setAppState({ teamPlayerList: [] });

        if(teamID){
          axios.get(`${url}/team/${teamID}/get-players`)
        .then((response) => {
            setLoading(false);
            setAppState({ teamPlayerList: response.data.Data as TeamPlayer[] });
            console.log(response);
            setIsUpdated(false);
            })
      // this catches any errors that may occur while fetching for player data
            .catch(error => { console.log(error) 
            setLoading(false);
      // this sets 'errorMessage' into the error that has occured
            })
        }
          }, [setAppState, teamID, isUpdated]);
    
  return (
    <React.Fragment>
      <div>
  {/* if  isLoading is true, loading text will apear, if api is able to fetch player data and isLoading is false, then show filled player table*/}
        {isLoading ? (<h1>Hold on, fetching data may take some time :)</h1>) : (<TableLoading teamPlayerList={appState.teamPlayerList} teamID={teamID} tableIsUpdated={props.tableIsUpdated}/>)}
      </div>
    </React.Fragment>
  );
};

export default FilledTeamPlayerTable;
