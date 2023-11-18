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
        setAddNewBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },
        setRemoveBook(state, action: PayloadAction<string>) {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },
        setToggleFavorite(state, action: PayloadAction<string>) {
            state.books = state.books.map((book) => (book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book));
        },
    },
});

export const { setAddNewBook, setRemoveBook, setToggleFavorite } = booksSlice.actions;
export default booksSlice.reducer;
