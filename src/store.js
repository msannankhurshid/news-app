import { configureStore } from '@reduxjs/toolkit';
import newsData  from './redux/slices/newsData';


export const store = configureStore({
    reducer: {
        newsData
    },
});