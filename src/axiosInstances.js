import axios from 'axios';

export const Http = axios.create({
    baseURL: process.env.REACT_APP_PROXY_SERVER    
});

export const AuthHttp = axios.create({
    baseURL: process.env.REACT_APP_PROXY_SERVER
});

export const HttpNode = axios.create({
    baseURL: process.env.REACT_APP_NODE_SERVER
})

AuthHttp.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if(token !== ''){
        config.headers.Authorization = `${token}`;
    }
    return config;
})