import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { v4 as uuidv4 } from 'uuid';
import { addNewBook } from '../../redux/booksSlice/booksSlice';
import booksData from '../../data/books.json';
import { Book } from '../../redux/booksSlice/booksSlice';
import './BookForm.scss';

interface BookFromJson {
    title: string;
    author: string;
    year: number;
}

export const BookForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    const dispatch = useAppDispatch();
    const getBooksFromState: Book[] = useAppSelector((state) => state.booksLibrary.books);

    const handleAddRandomBook = (): void => {
        const getRandomBookFromData = () => {
            const randomIndex: number = Math.floor(Math.random() * booksData.length);
            return booksData[randomIndex];
        };
        const getBook: BookFromJson = getRandomBookFromData();
        const checkForSameBook: Book[] = getBooksFromState.filter((book) => book.title === getBook.title);
        if (checkForSameBook.length === 0) {
            const newRandomBook: Book = {
                id: uuidv4(),
                title: getBook.title,
                author: getBook.author,
            };

            dispatch(addNewBook(newRandomBook));
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
            const newBook = {
                id: uuidv4(),
                title: title,
                author: author,
            };
            dispatch(addNewBook(newBook));
            setTitle('');
            setAuthor('');
        }
    };

    return (
        <div className='app-block book-form'>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title: </label>
                    <input id='title' type='text' value={title} onChange={titleChange} />
                </div>
                <div>
                    <label htmlFor='author'>Author: </label>
                    <input id='author' type='text' value={author} onChange={authorChange} />
                </div>
                <button type='submit'>Add Book</button>
                <button type='button' onClick={handleAddRandomBook}>
                    Add Random
                </button>
            </form>
        </div>
    );
};
