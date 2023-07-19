import axios from "axios";

const API_URL = 'http://localhost:3004'
// console.log(import.meta.env.VITE_APP_API_URL)

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData)
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData)