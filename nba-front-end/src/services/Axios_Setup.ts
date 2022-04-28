import axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

const initialiseAxios = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    /*
        Add default headers, interceptors etc..
    */

    return axiosInstance;
};

export default initialiseAxios;