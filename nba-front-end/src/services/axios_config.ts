import { AxiosRequestConfig } from 'axios';

export const AxiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: `${process.env.REACT_APP_AzureAPIDotNet}`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};