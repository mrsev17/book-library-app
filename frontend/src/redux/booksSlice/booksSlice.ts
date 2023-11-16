import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
    title: string;
    author: string;
    id: string;
    year?: number;
}

interface BooksState {
    books: Book[];
}

const initialState: BooksState = {
    books: [],
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addNewBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        removeBook(state, action: PayloadAction<string>) {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },
    },
});

export const { addNewBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
