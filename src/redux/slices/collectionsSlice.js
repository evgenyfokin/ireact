import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {deleteCollection, getAllCollections, patchCollection, postCollection} from "../../api/auth";

const initialState = {
    collections: [],
    collection: '',
    status: "idle",
    error: null
}

export const fetchCollections = createAsyncThunk(
    "collectionsList/fetchCollections",
    async () => {
        const response = await getAllCollections()
        return response.data
    }
)

export const createCollection = createAsyncThunk(
    "collections/createCollection",
    async ({newCollection, token}) => {
        const response = await postCollection(newCollection, token)
        return response.data
    }
)

export const updateCollection = createAsyncThunk(
    "collections/updateCollection",
    async ({id, updatedCollection, token}) => {
        const response = await patchCollection(id, updatedCollection, token)
        return response
    }
)

export const removeCollection = createAsyncThunk(
    'collections/removeCollection',
    async ({id, token}) => {
        const response = await deleteCollection(id, token)
        return response
    }
)

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCollections.pending]: state => {
            state.status = "loading"
        },
        [fetchCollections.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.collections = action.payload
        },
        [fetchCollections.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [createCollection.fulfilled]: (state, action) => {
            state.collections.push(action.payload)
        }
    }
})

export default collectionsSlice.reducer