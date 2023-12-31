import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import createBookWithID from '../../utils/createBookWithID';
import { setError } from '../errorSlice/errorSlice';
import { RootState } from '../store';

export const fetchBook = createAsyncThunk('books/fetchBook', async (url: string, thunkAPI) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error: any) {
        thunkAPI.dispatch(setError('Currently unavailable'));
        // thunkAPI.dispatch(setError(error.message));
        return thunkAPI.rejectWithValue(error);
    }
});

export interface Book {
    title: string;
    author: string;
    id: string;
    isFavorite: boolean;
    year?: number;
    source?: string;
}

interface BooksState {
    books: Book[];
    isLoadingViaAPI: boolean;
}

const initialState: BooksState = {
    books: [
        {
            title: 'Martin Eden',
            author: 'Jack London',
            id: '1',
            isFavorite: true,
            year: 1909,
            source: 'manual',
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            id: '2',
            isFavorite: false,
            year: 1960,
            source: 'manual',
        },
        {
            title: 'Of Mice and Men',
            author: 'John Steinbeck',
            id: '3',
            isFavorite: false,
            year: 1937,
            source: 'manual',
        },
    ],
    isLoadingViaAPI: false,
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setAddNewBook(state: BooksState, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        setRemoveBook(state: BooksState, action: PayloadAction<string>) {
            state.books = state.books.filter((book: Book) => book.id !== action.payload);
        },
        setToggleFavorite(state: BooksState, action: PayloadAction<string>) {
            state.books = state.books.map((book: Book) => (book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book));
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<BooksState>) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.isLoadingViaAPI = true;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.isLoadingViaAPI = false;
                if (action?.payload?.title && action?.payload?.author) {
                    state.books.push(createBookWithID(action.payload, 'API'));
                }
            })
            .addCase(fetchBook.rejected, (state) => {
                state.isLoadingViaAPI = false;
            });
    },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectLoadingViaAPI = (state: RootState) => state.books.isLoadingViaAPI;

export const { setAddNewBook, setRemoveBook, setToggleFavorite } = booksSlice.actions;

export default booksSlice.reducer;
