import { defer, map, Observable } from 'rxjs';
import { axiosRequestConfiguration } from './AxiosConfig';
import InitialiseAxios from './AxiosSetup';

const axiosInstance = InitialiseAxios(axiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(()=> axiosInstance.get<T>(url, { params: queryParams }))
      .pipe(map(result => result.data));
};

export default { get };