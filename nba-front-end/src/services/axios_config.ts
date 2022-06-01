import { AxiosRequestConfig } from 'axios';

let apiURL:string = `${process.env.REACT_APP_API_URL}`;

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: apiURL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};
