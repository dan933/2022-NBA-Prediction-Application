import { AxiosRequestConfig } from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: `${process.env.REACT_APP_LocalAPIDotNet}`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};
