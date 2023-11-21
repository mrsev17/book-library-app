import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice/booksSlice';
import filterReducer from './filtersSlice/filtersSlice';
import errorReducer from './errorSlice/errorSlice';

const store = configureStore({
    reducer: {
        books: booksReducer,
        filter: filterReducer,
        errors: errorReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
