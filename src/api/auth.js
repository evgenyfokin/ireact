import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)
export const register = (userData) => axios.post(`/api/auth/register`, userData)
export const login = (userData) => axios.post(`/api/auth/login`, userData)