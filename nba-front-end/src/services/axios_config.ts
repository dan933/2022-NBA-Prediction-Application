import { AxiosRequestConfig } from 'axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: 'https://my-json-server.typicode.com/EveJoyceStudent/NBA-mock-api/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};