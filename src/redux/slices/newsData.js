import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKey1: "f45fa21b4ef44306a06ea49c35184326",
  apiKey2: "wQ8UOc86QzUDbZMO1GuuUDUAmGU2XK3v",
  apiKey3: "f45fa21b4ef44306a06ea49c35184326",
  loadingSource1: false,
  loadingSource2: false,
  loadingSource3: false,

  newsDataSource1: [],
  newsDataSource2: [],
  newsDataSource3: [],
};

export const newsDataSlice = createSlice({
  name: "newsData",
  initialState,
  reducers: {
    setLoadingSource1: (state, { payload }) => {
      state["loadingSource1"] = payload;
    },
    setLoadingSource2: (state, { payload }) => {
      state["loadingSource2"] = payload;
    },
    setLoadingSource3: (state, { payload }) => {
      state["loadingSource3"] = payload;
    },
    setNewsDataSource1: (state, { payload }) => {
      state["newsDataSource1"] = payload;
    },
    setNewsDataSource2: (state, { payload }) => {
      state["newsDataSource2"] = payload;
    },
    setNewsDataSource3: (state, { payload }) => {
      state["newsDataSource3"] = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoadingSource1,
  setLoadingSource2,
  setLoadingSource3,
  setNewsDataSource1,
  setNewsDataSource2,
  setNewsDataSource3,
} = newsDataSlice.actions;

export default newsDataSlice.reducer;
