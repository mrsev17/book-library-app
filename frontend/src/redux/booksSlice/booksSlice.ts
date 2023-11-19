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
    books: [
        {
            title: 'Martin Eden',
            author: 'Jack London',
            id: '1',
            isFavorite: true,
            year: 1909,
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            id: '2',
            isFavorite: false,
            year: 1960,
        },
        {
            title: 'Of Mice and Men',
            author: 'John Steinbeck',
            id: '3',
            isFavorite: false,
            year: 1937,
        },
    ],
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
