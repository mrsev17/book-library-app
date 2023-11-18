import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
    title: string;
    author: string;
    id: string;
    isFavorite: boolean;
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
        toggleFavorite(state, action: PayloadAction<string>) {
            state.books = state.books.map((book) => (book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book));
        },
    },
});

export const { addNewBook, removeBook, toggleFavorite } = booksSlice.actions;
export default booksSlice.reducer;
