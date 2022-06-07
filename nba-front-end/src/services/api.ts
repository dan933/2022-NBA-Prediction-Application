import axios from 'axios';
import { defer, map, Observable } from 'rxjs';
import { axiosRequestConfiguration } from './axios_config';
import initialiseAxios from './axios_setup';

const axiosInstance = initialiseAxios(axiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(()=> axiosInstance.get<T>(url, { params: queryParams }))
      .pipe(map(result => result.data));
};

const url = axiosRequestConfiguration.baseURL

interface ICreateTeamRequest {
  TeamName?:string
}

//---------------------------- Create Team API call ----------------------------//
const CreateTeam = async (teamName?: string) => {
  const createTeamRequest: ICreateTeamRequest = { TeamName: teamName }
  const res = await axios.post(`${url}/team/create-team`, createTeamRequest)
  .catch((err) => {
  throw err
  })

  return res
}


//--------------------------- Remove Team API call -----------------------------//
const RemoveTeam = async (teamId: number | null) => {
  
  const res = await axios.delete(`${url}/team/${teamId}/removeTeams`)
    .catch((err) => {
      throw err
  })
  
  return res
};
//---------------------------- API Get Teams Winrate ------------------------//
//todo look into observable api calls https://github.com/zhaosiyang/axios-observable
const GetAllTeams = async () => {

  const res:any = await axios.get(`${url}/team/get-winrate`)
  .catch((err) => {
    throw err
  })
  return res;

}

//--------------------------- Remove Player API call -----------------------------//
const RemovePlayer = async (teamId?: number, playersToRemove?:number[]) => {
  
  const res = await axios.delete(`${url}/team/${teamId}/removePlayers`, {data: playersToRemove}).catch((err) => {
    throw err
  })
  
  return res
};


//---------------------------- API Team Match Up for predictions page ------------------------//
const GetTeamMatchUp = async (team1:number, team2:number) => {
    const res:any = await axios.get(`${url}/team/${team1}/${team2}/CompareWinChance`)
    .catch((err) => {
      throw err
    })
    
    return res;

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, RemoveTeam, CreateTeam, GetAllTeams, GetTeamMatchUp, RemovePlayer};

