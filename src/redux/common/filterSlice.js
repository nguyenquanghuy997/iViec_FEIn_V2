import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openForm: false,
    data: {},               // single item edit/delete
    selectedData: [],       // multiple item select
    columns: [],            // columns select
};

export const filterSlice = createSlice({
    name: 'filterReducer',
    initialState,
    reducers: {
        openFilterModal: (state) => {
            state.openForm = true;
        },
        setAllDataFilter: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        setDataFilter: (state, action) => {
            const { key, value } = action.payload;
            state.data = {
                ...state.data,
                [key]: value
            };
        },
        clearDataFilterByKey: (state, action) => {
            const { key, value } = action.payload;
            state.data = {
                ...state.data,
                [key]: value
            };
        },
        clearDataFilter: (state) => {
            state.openForm = false;
            state.data = {};
        },
        closeModal: (state) => {
            state.openForm = false;
        },
    },
});
