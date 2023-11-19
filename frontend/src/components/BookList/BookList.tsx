import { useAppSelector, useAppDispatch } from '../../hook';
import { setRemoveBook, setToggleFavorite } from '../../redux/booksSlice/booksSlice';
import { Book } from '../../redux/booksSlice/booksSlice';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { selectTitleFilter, selectAuthorFilter } from '../../redux/filtersSlice/filtersSlice';
import { AppDispatch } from '../../redux/store';
import './BookList.scss';

export const BookList: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const books: Book[] = useAppSelector((state) => state.books.books);
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const authorFilter: string = useAppSelector(selectAuthorFilter);
    const deleteHandle = (id: string): void => {
        dispatch(setRemoveBook(id));
    };
    const favoriteBookHandle = (id: string): void => {
        dispatch(setToggleFavorite(id));
    };
    const filteredBooks: Book[] = books.filter((book: Book) => {
        const matchesTitle: boolean = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        const matchesAuthor: boolean = book.author.toLowerCase().includes(authorFilter.toLowerCase());
        return matchesTitle && matchesAuthor;
    });
    return (
        <div className='app-block book-list'>
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            <div className='book-info'>
                                {++i}. {book.title} by <strong>{book.author}</strong>
                            </div>
                            <div className='book-actions'>
                                <span onClick={() => favoriteBookHandle(book.id)}>
                                    {book.isFavorite ? <BsBookmarkStarFill className='star-icon' /> : <BsBookmarkStar className='star-icon' />}
                                </span>
                                <button type='button' onClick={() => deleteHandle(book.id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
