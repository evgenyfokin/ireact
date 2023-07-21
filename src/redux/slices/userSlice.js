import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    status: 'idle',
    error: null,
    token: localStorage.getItem('token')
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: state => {
            state.status = 'loading'
        },
        loginSuccess: (state, action) => {
            state.status = 'succeed'
            state.user = action.payload
            state.token = action.payload.token
            localStorage.setItem('token', action.payload.token)
        },
        registerSuccess: (state, action) => {
            state.status = 'succeed'
            state.user = action.payload
        },
        loginFail: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.status = 'idle'
            state.token = null
            localStorage.removeItem('token')
        }
    }
})

export const {loginStart, loginSuccess, registerSuccess, loginFail, logout} = userSlice.actions
export default userSlice.reducer