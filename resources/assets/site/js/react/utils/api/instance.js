import axios from "axios";

export const instance = axios.create({
    baseURL : '/api',
    withCredentials: true,
    headers: {'Accept': 'application/json'}
})

export const instanceSite = axios.create({
    baseURL : '/',
    withCredentials: true,
    headers: {'Accept': 'application/json'}
})
