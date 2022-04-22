import Axios, { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'Axios';

const initialiseAxios = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = Axios.create(config);

    /*
        Add default headers, interceptors etc..
    */

    return axiosInstance;
};

export default initialiseAxios;