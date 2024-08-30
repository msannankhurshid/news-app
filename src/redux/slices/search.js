import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  searchTrigger1: true,
  searchTrigger2: true,
  searchTrigger3: true,
  searchValue: "Top News",
  toggleSearchBox: false,
  selectedSource: "all",
  sourceOptions: [],
  selectedDate: "anytime",
  dateOptions: [
    {
      value: "anytime",
      label: "Anytime",
    },
    {
      value: "pastHour",
      label: "Past Hour",
    },
    {
      value: "past24Hour",
      label: "Past 24 Hour",
    },
    {
      value: "pastWeek",
      label: "Past Week",
    },
    {
      value: "pastMonth",
      label: "Past Month",
    },
  ],
  selectedCategory: "all",
  categoryOptions: [
    {
      value: "all",
      label: "All",
    },
    {
      value: "business",
      label: "Business",
    },
    {
      value: "entertainment",
      label: "Entertainment",
    },
    {
      value: "general",
      label: "General",
    },
    {
      value: "health",
      label: "Health",
    },
    {
      value: "science",
      label: "Science",
    },
    {
      value: "sports",
      label: "Sports",
    },
    {
      value: "technology",
      label: "Technology",
    },
  ],
  apiSourceOptions: [
    {
      value: "NewsAPI.org",
      label: "NewsAPI.org",
    },
    {
      value: "bbc-news",
      label: "BBC News",
    },
    {
      value: "OpenNews",
      label: "OpenNews",
    },
  ],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state["loading"] = payload;
    },
    setSearchTrigger1: (state, { payload }) => {
      state["searchTrigger1"] = payload;
    },
    setSearchTrigger2: (state, { payload }) => {
      state["searchTrigger2"] = payload;
    },
    setSearchTrigger3: (state, { payload }) => {
      state["searchTrigger3"] = payload;
    },
    setSearchValue: (state, { payload }) => {
      state["searchValue"] = payload;
    },
    setToggleSearchBox: (state, { payload }) => {
      state["toggleSearchBox"] = payload;
    },
    setSelectedSource: (state, { payload }) => {
      state["selectedSource"] = payload;
    },
    setSourceOptions: (state, { payload }) => {
      state["sourceOptions"] = payload;
    },
    setSelectedDate: (state, { payload }) => {
      state["selectedDate"] = payload;
    },
    setSelectedCategory: (state, { payload }) => {
      state["selectedCategory"] = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setSearchTrigger1,
  setSearchTrigger2,
  setSearchTrigger3,
  setSearchValue,
  setToggleSearchBox,
  setSelectedSource,
  setSourceOptions,
  setSelectedDate,
  setSelectedCategory,
} = searchSlice.actions;

export default searchSlice.reducer;
