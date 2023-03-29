import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: []
};

export const pipelineFilterSlice = createSlice({
  name: 'pipelineFilterSlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      const newData = [...state.data, ...action.payload];
      const key = 'id';
      state.data = [...new Map(newData.map(item => [item[key], item])).values()]
    },
    clearData: (state) => {
      state.data = []
    }
  },
});
