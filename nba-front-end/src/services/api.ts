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

//--------------------------- Remove team api call -----------------------------//
const RemoveTeam = async (teamId:number) => {

  const res = await axios.delete(`${url}/team/${teamId}/removeTeams`)
  
  return res
};

//------------------------------ Get Teams ------------------------------------//
// todo
// const GetTeams = async () => {
//   get('/team/get-all').subscribe(
//     (resp:any) => {
//         return resp
//     })

// }

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, RemoveTeam };