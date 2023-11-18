import { useAppSelector, useAppDispatch } from '../../hook';
import { setRemoveBook, setToggleFavorite } from '../../redux/booksSlice/booksSlice';
import { Book } from '../../redux/booksSlice/booksSlice';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { selectTitleFilter } from '../../redux/filtersSlice/filtersSlice';
import './BookList.scss';

export const BookList: React.FC = () => {
    const dispatch = useAppDispatch();
    const books: Book[] = useAppSelector((state) => state.books.books);
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const deleteHandle = (id: string): void => {
        dispatch(setRemoveBook(id));
    };
    const favoriteBookHandle = (id: string) => {
        dispatch(setToggleFavorite(id));
    };
    const filteredBooks: Book[] = books.filter((book: any) => {
        const matchesTitle: boolean = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        return matchesTitle;
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
