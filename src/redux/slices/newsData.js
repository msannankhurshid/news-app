import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  apiKey: 'f45fa21b4ef44306a06ea49c35184326',
  listData: [],
}

export const newsDataSlice = createSlice({
  name: 'newsData',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state['loading'] = payload;
    },
    setListData: (state, { payload }) => {
      state['listData'] = payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setListData } = newsDataSlice.actions;

export default newsDataSlice.reducer;