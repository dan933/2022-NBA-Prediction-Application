import { AxiosRequestConfig } from 'axios';

let apiURL:string = "";

if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    apiURL = `${process.env.REACT_APP_LocalAPIDotNet}`;
}else{
    apiURL = `${process.env.REACT_APP_API_URL}`;
}

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: apiURL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};
