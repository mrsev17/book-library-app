import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice/booksSlice';
import filterReducer from './filtersSlice/filtersSlice';

const store = configureStore({
    reducer: {
        books: booksReducer,
        filter: filterReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
