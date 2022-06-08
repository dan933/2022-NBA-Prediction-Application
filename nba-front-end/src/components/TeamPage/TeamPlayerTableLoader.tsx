import React, { useState } from "react";
import { useEffect } from "react";
import api from "../../services/api";
import { TeamPlayer } from '../../models/ITeamPlayer';
import TeamPlayerTable from './TeamPlayerTable';
import { axiosRequestConfiguration } from "../../services/axios_config";
import { useAuth0 } from "@auth0/auth0-react";

interface TeamPlayerProps {
  teamPlayerList: any[];
}

const url = axiosRequestConfiguration.baseURL

const TeamPlayerTableLoader: React.FC<any> = (props) => {
  const [appState, setAppState] = useState<TeamPlayerProps>({
    teamPlayerList: [],
  });
  const [isLoading, setLoading] = useState(false);
  
  const { getAccessTokenSilently } = useAuth0();
  
  // gets value from create team form

  const getPlayersFromTeam = async () => {



    if (props.teamID.length !== 0) {

      const token = await getAccessTokenSilently();

      setLoading(true);
      setAppState({ teamPlayerList: [] });

      api.get(`${url}/team/${props.teamID}/get-players`, token).subscribe({
        next: (resp: any) => {         

          setAppState({ teamPlayerList: resp.Data as TeamPlayer[] });
          props.setTeamPlayersList(resp.Data.map((a:any)=>a.PlayerID));
          props.setIsUpdated(false);
          setLoading(false);

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
  }, [setAppState, props.teamID, props.isUpdated]);
  
  const yourLineUpSection = () => {
    if (!isLoading && props.teamID.length === 0) {
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
