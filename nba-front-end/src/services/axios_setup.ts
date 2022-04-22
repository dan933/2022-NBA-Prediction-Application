import axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

const InitialiseAxios = (config: AxiosRequestConfig): AxiosInstance => {
    const AxiosInstance = axios.create(config);

    /*
        Add default headers, interceptors etc..
    */

    return AxiosInstance;
};

export default InitialiseAxios;