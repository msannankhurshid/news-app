import { configureStore } from '@reduxjs/toolkit';
import newsData  from './redux/slices/newsData';
import search  from './redux/slices/search';


export const store = configureStore({
    reducer: {
        newsData,
        search,
    },
});