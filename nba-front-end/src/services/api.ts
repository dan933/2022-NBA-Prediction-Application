import axios from 'axios';
import { defer, map, Observable } from 'rxjs';
import { axiosRequestConfiguration } from './axios_config';
import initialiseAxios from './axios_setup';

const get = <T>(url: string, token?:string, queryParams?: object): Observable<T> => {
  
  const axiosConfig = axiosRequestConfiguration

  axiosConfig.headers = {
    ...axiosConfig.headers,
    'Authorization':`Bearer ${token}`
  }

  const axiosInstance = initialiseAxios(axiosConfig);

  return defer(()=> axiosInstance.get<T>(url, { params: queryParams }))
      .pipe(map(result => result.data));
};

const url = axiosRequestConfiguration.baseURL

interface ICreateTeamRequest {
  TeamName?:string
}

//------------------------- Helper function to check if team is selected -----------------//
//todo probably not needed
const isTeamSelected = (teamValue: number | undefined) => {
  return typeof teamValue ==='number'
}

//---------------------------- get team player line up -------------------------//
const getTeamPlayers = async (token: string, setTeamPlayersList:(value: any) => void, setLoading:(value: any) => void, teamId?: number) => {

  if (isTeamSelected(teamId)) {
    setLoading(true);
    get(`${url}/team/${teamId}/get-players`, token).subscribe({
      next: (resp: any) => {
        setTeamPlayersList(resp.Data)
      },
      error: (err) => {
        console.log(err)
        setLoading(false);
      },
      complete:() => { setLoading(false) }
    })
  }
}


//---------------------------- Create Team API call ----------------------------//
const CreateTeam = async ( token:string, teamName?: string) => {
  const createTeamRequest: ICreateTeamRequest = { TeamName: teamName }
  const res = await axios.post(`${url}/team/create-team`, createTeamRequest, {
    headers: {
      'Authorization':`Bearer ${token}`
    }
  })
  .catch((err) => {
  throw err
  })

  return res
}


//--------------------------- Remove Team API call -----------------------------//
const RemoveTeam = async (token:string, teamId?: number) => {
  
  const res = await axios.delete(`${url}/team/${teamId}/removeTeams`, {
    headers: {
      'Authorization':`Bearer ${token}`
    }
  })
    .catch((err) => {
      throw err
  })
  
  return res
};
//---------------------------- API Get Teams Winrate ------------------------//
//todo look into observable api calls https://github.com/zhaosiyang/axios-observable
const GetAllTeams = async (token:string) => {

  const res: any = await axios.get(`${url}/team/get-winrate`, {
    headers: {
      'Authorization':`Bearer ${token}`
    }
  })
  .catch((err) => {
    throw err
  })
  return res;

}

//--------------------------- Remove Player API call -----------------------------//
const RemovePlayer = async (token:string, teamId?: number, playersToRemove?:number[]) => {
  
  const res = await axios.delete(`${url}/team/${teamId}/removePlayers`, {data: playersToRemove, headers: {
    'Authorization':`Bearer ${token}`
  }}).catch((err) => {
    throw err
  })
  
  return res
};


//---------------------------- API Team Match Up for predictions page ------------------------//
const GetTeamMatchUp = async (token:string, team1:number, team2:number) => {
  const res: any = await axios.get(`${url}/team/${team1}/${team2}/CompareWinChance`, {
    headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .catch((err) => {
      throw err
    })
    
    return res;

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, RemoveTeam, CreateTeam, GetAllTeams, GetTeamMatchUp, RemovePlayer, getTeamPlayers};

