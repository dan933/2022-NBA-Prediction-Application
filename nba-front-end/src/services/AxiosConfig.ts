import { AxiosRequestConfig } from 'Axios';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: `${process.env.REACT_APP_AzureAPIDotNet}`,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};