import { useAppSelector, useAppDispatch } from '../../hook';
import { removeBook, toggleFavorite } from '../../redux/booksSlice/booksSlice';
import { Book } from '../../redux/booksSlice/booksSlice';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import './BookList.scss';

export const BookList: React.FC = () => {
    const dispatch = useAppDispatch();
    const books: Book[] = useAppSelector((state) => state.booksLibrary.books);
    const deleteHandle = (id: string): void => {
        dispatch(removeBook(id));
    };
    const favoriteBookHandle = (id: string) => {
        dispatch(toggleFavorite(id));
    };
    return (
        <div className='app-block book-list'>
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {books.map((book, i) => (
                        <li key={book.id}>
                            <div className='book-info'>
                                {++i}. {book.title} by <strong>{book.author}</strong>
                            </div>
                            <div className='book-actions'>
                                <span onClick={() => favoriteBookHandle(book.id)}>
                                    {book.isFavorite ? <BsBookmarkStarFill className='star-icon' /> : <BsBookmarkStar className='star-icon' />}
                                </span>
                                <button onClick={() => deleteHandle(book.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
