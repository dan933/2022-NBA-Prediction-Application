import { defer, map, Observable } from 'rxjs';
import { AxiosRequestConfiguration } from './AxiousConfig';
import InitialiseAxios from './AxiousSetup';

const axiosInstance = InitialiseAxios(AxiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
  return defer(()=> axiosInstance.get<T>(url, { params: queryParams }))
      .pipe(map(result => result.data));
};

export default { get };