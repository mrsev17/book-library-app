import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setAddNewBook, fetchBook } from '../../redux/booksSlice/booksSlice';
import booksData from '../../data/books.json';
import { Book, selectBooks } from '../../redux/booksSlice/booksSlice';
import { FaSpinner } from 'react-icons/fa';
import createBookWithID from '../../utils/createBookWithID';
import { setError } from '../../redux/errorSlice/errorSlice';
import { selectLoadingViaAPI } from '../../redux/booksSlice/booksSlice';
import './BookForm.scss';

export interface BookFromJson {
    title: string;
    author: string;
    year: number;
}

export const BookForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    const dispatch = useAppDispatch();
    const getBooksFromState: Book[] = useAppSelector(selectBooks);
    const loaderViaAPI: boolean = useAppSelector(selectLoadingViaAPI);

    const handleAddRandomBook = (): void => {
        const getRandomBookFromData = (): BookFromJson => {
            const randomIndex: number = Math.floor(Math.random() * booksData.length);
            return booksData[randomIndex];
        };
        const getBook: BookFromJson = getRandomBookFromData();
        const checkForSameBook: Book[] = getBooksFromState.filter((book) => book.title === getBook.title);
        if (checkForSameBook.length === 0) {
            dispatch(setAddNewBook(createBookWithID(getBook, 'random')));
        } else {
            handleAddRandomBook();
        }
    };

    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const authorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title && author) {
            dispatch(setAddNewBook(createBookWithID({ title, author }, 'manual')));
            setTitle('');
            setAuthor('');
        } else {
            dispatch(setError('You must fill title and author'));
        }
    };

    const handleAddRandomBookViaAPI = () => {
        dispatch(fetchBook('http://localhost:4000/random-book-delay'));
    };

    return (
        <div className='app-block book-form'>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input id='title' type='text' value={title} onChange={titleChange} />
                </div>
                <div>
                    <label htmlFor='author'>Author:</label>
                    <input id='author' type='text' value={author} onChange={authorChange} />
                </div>
                <button type='submit'>Add Book</button>
                <button type='button' onClick={handleAddRandomBook}>
                    Add Random Book
                </button>

                <button disabled={loaderViaAPI} type='button' onClick={handleAddRandomBookViaAPI}>
                    {loaderViaAPI ? (
                        <>
                            <span>Loading Book...</span>
                            <FaSpinner className='spinner' />
                        </>
                    ) : (
                        'Add Random via API'
                    )}
                </button>
            </form>
        </div>
    );
};
