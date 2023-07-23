import axios from "axios";

// const API_URL = 'http://localhost:3005'
const API_URL = process.env.REACT_APP_API_URL;

export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);

export const getAllCollections = () => axios.get(`${API_URL}/collections`)
export const postCollection = (newCollection, token) =>
    axios.post(
        `${API_URL}/collections`,
        newCollection, {
    headers: {
        'Authorization': token
    }
})
export const getCollection = (id) =>
    axios.get(`${API_URL}/collections/${id}`);
export const patchCollection = (id, updatedCollection, token) => {
    axios.patch(
        `${API_URL}/collections/${id}`,
        updatedCollection, {
            headers: {
                'Authorization': token
            }
        }
    )
}
export const deleteCollection = (id, token) => {
    axios.delete(
        `${API_URL}/collections/${id}`, {
            headers: {
                'Authorization': token
            }
        }
    )
}

export const postImg = (imgData, token) => {
    return axios.post(`${API_URL}/upload`, imgData, {
        headers: {
            "Authorization" : token
        }
    })
}
