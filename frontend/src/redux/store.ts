import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './booksSlice/booksSlice';

const store = configureStore({
    reducer: {
        booksLibrary: booksSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
