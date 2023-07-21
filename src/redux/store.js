import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import collectReducer from './slices/collectionsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        collections: collectReducer
    }
});