import { useAppSelector, useAppDispatch } from '../../hook';
import { removeBook } from '../../redux/booksSlice/booksSlice';
import './BookList.scss';

export const BookList: React.FC = () => {
    const dispatch = useAppDispatch();
    const books = useAppSelector((state) => state.booksLibrary.books);
    const deleteHandle = (id: string) => {
        dispatch(removeBook(id));
    };
    return (
        <div className='app-block book-list'>
            <h2>Book List</h2>
            <ul>
                {books.map((book) => {
                    return (
                        <li key={book.id}>
                            {book.title} <button onClick={() => deleteHandle(book.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
