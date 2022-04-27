import { AxiosRequestConfig } from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: `${process.env.REACT_APP_MockAPI}`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};