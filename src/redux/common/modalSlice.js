import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openForm: false,        // form create/update
    openConfirm: false,     // delete
    openActive: false,      // active
    openBottomNav: false,   // bottom nav
    openFilter: false,      // filter
    openState: {},
    data: {},               // single item edit/delete
    selectedData: [],       // multiple item select
    columns: [],            // columns select
};

export const modalSlice = createSlice({
    name: 'modalReducer',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.openForm = true;
            state.data = {...state.data, ...action.payload};
        },
        confirmModal: (state, action) => {
            state.openConfirm = true;
            state.data = {...state.data, ...action.payload};
        },
        openStateModal: (state, action) => {
            state.openState = {
                ...state.openState,
                ...action.payload
            };
            state.data = {...state.data, ...action.payload};
        },
        activeModal: (state, action) => {
            state.openActive = true;
            state.data = {...state.data, ...action.payload};
        },
        onBottomNavModal: (state, action) => {
            state.openBottomNav = true;
            state.data = {...state.data, ...action.payload.data};
            state.selectedData = [...state.selectedData, ...action.payload.selectedData];
        },
        onFilterModal: (state) => {
            state.openFilter = true;
        },
        closeModal: (state) => {
            state.openForm = false;
            state.openConfirm = false;
            state.openActive = false;
            state.openBottomNav = false;
            state.openState = {};
            state.data = {};
            state.selectedData = []
        },
    },
});
