import { useState } from 'react';
import { useAppDispatch } from '../../hook';
import { v4 as uuidv4 } from 'uuid';
import { addNewBook } from '../../redux/booksSlice/booksSlice';
import './BookForm.scss';

export const BookForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');

    const dispatch = useAppDispatch();

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
            </form>
        </div>
    );
};
