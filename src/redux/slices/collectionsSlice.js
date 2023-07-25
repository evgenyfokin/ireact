import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    getCollection,
    getAllCollections,
    postCollection,
    patchCollection,
    deleteCollection,
    postImg
} from '../../api/auth'

const initialState = {
    collections: [],
    collection: '',
    status: "idle",
    imgUrl: null,
    collectionStatus: '',
    error: null
}

export const fetchCollections = createAsyncThunk(
    "collectionsList/fetchCollections",
    async () => {
        const response = await getAllCollections()
        return response.data
    }
)

export const fetchCollection = createAsyncThunk(
    "collections/fetchCollection",
    async (id) => {
        const response = await getCollection(id)
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
        return response.data
    }
)

export const removeCollection = createAsyncThunk(
    "collections/deleteCollection",
    async ({id, token}) => {
        await deleteCollection(id, token)
        return id
    }
)

export const uploadImage = createAsyncThunk(
    "collections/uploadImage",
    async ({imgData, token}) => {
        const response = await postImg(imgData, token);
        return response.data.image_url
    }
)

export const createCollectionAndUploadImage = createAsyncThunk(
    "collections/createCollectionAndUploadImage",
    async ({ collectionData, imgData, token }, thunkAPI) => {

        const response = await postImg(imgData, token);
        const imageUrl = response.data.image_url;

        const newCollectionData = {
            ...collectionData,
            imageUrl,
        };
        await thunkAPI.dispatch(createCollection(newCollectionData));

        thunkAPI.dispatch(resetImageUrl());
    }
);


const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        resetCollections: (state) => {
            return initialState
        },
        resetImageUrl: (state) => {
            state.imgUrl = null
        }

    },
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
            state.imgUrl = null
        },
        [fetchCollection.pending]: state => {
            state.status = "loading"
        },
        [fetchCollection.fulfilled]: (state, action) => {
            state.status = "succeeded"
            state.collection = action.payload
        },
        [fetchCollection.rejected]: (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        },
        [updateCollection.fulfilled]: (state, action) => {
            const updatedCollectionIndex = state.collections
                .findIndex(collection => collection._id === action.payload._id)
            if (updatedCollectionIndex !== -1) {
                state.collections[updatedCollectionIndex] = action.payload
            }
        },
        [removeCollection.fulfilled]: (state, action) => {
            state.collections = state.collections.filter(
                collection => collection._id !== action.payload
            );
        },
        [uploadImage.fulfilled]: (state, action) => {
            state.imgUrl = action.payload
        }
    }
})

export const {resetCollections, resetImageUrl} = collectionsSlice.actions
export default collectionsSlice.reducer