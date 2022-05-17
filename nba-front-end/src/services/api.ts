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
const RemoveTeam = async (teamId?: number) => {
  
  const res = await axios.delete(`${url}/team/${teamId}/removeTeams`)
    .catch((err) => {
      throw err
  })
  
  return res
};


//--------------------------- Get Winrate Team API call -----------------------------//
const WinChance = async (teamId?: number) => {
  
  const res = await axios.get(`${url}/team/${teamId}/get-winrate`)
    .catch((err) => {
      throw err
  })
  
  return res
};

//------------------------------ Get Teams ------------------------------------//
//todo look into observable api calls https://github.com/zhaosiyang/axios-observable
const GetAllTeams = /*async*/ () => {

//---------------------------- Mock Data for predictions page ------------------------//
interface ITeam {  
  TeamID ?: number,
  TeamName?: string
  //win percentage data is expected to be in decimals from the API
  WinPer?:number
  }

  const teamList: ITeam[] = [
    {
      TeamID: 1,
      TeamName: 'Bob',
      WinPer: 0.97574643,
    },
    {
      TeamID: 2,
      TeamName: 'Greg',
      WinPer: 0.1737222234,
    },
    {
      TeamID: 99,
      TeamName: 'Hi',
      WinPer: 0.5,
    },
    {
      TeamID: 4,
      TeamName: 'Jeff',
      WinPer: 0.5,
    },
    {
      TeamID: 5,
      TeamName: 'James',
      WinPer: 0.58,
    }
  ]

  return teamList

  



//----------------------------- API call replaces the code below --------------------//
  // const res = await axios.get(`${url}/team/get-all`)
  //   .catch((err) => {
  //   throw err
  //   })
  
  // return res
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { get, RemoveTeam, CreateTeam, GetAllTeams, WinChance };