import { useAppSelector, useAppDispatch } from '../../hook';
import { setRemoveBook, setToggleFavorite } from '../../redux/booksSlice/booksSlice';
import { Book } from '../../redux/booksSlice/booksSlice';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { selectTitleFilter, selectAuthorFilter, selectFavoriteFilter } from '../../redux/filtersSlice/filtersSlice';
import { AppDispatch } from '../../redux/store';
import './BookList.scss';

export const BookList: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const books: Book[] = useAppSelector((state) => state.books.books);
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const authorFilter: string = useAppSelector(selectAuthorFilter);
    const favoriteBooksFilter: boolean = useAppSelector(selectFavoriteFilter);

    const deleteHandle = (id: string): void => {
        dispatch(setRemoveBook(id));
    };
    const favoriteBookHandle = (id: string): void => {
        dispatch(setToggleFavorite(id));
    };

    const filteredBooks: Book[] = books.filter((book: Book): boolean => {
        const matchesTitle: boolean = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        const matchesAuthor: boolean = book.author.toLowerCase().includes(authorFilter.toLowerCase());
        const matchesFavorite: boolean = favoriteBooksFilter ? book.isFavorite : true;
        return matchesTitle && matchesAuthor && matchesFavorite;
    });

    const highlightMatch = (text: string, filter: string): React.ReactNode => {
        if (!filter) return text;
        const regex: RegExp = new RegExp(`(${filter})`, 'gi');
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className='highlight'>
                        {substring}
                    </span>
                );
            }
            return substring;
        });
    };

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
                                {++i}. {highlightMatch(book.title, titleFilter)} by <strong>{highlightMatch(book.author, authorFilter)}</strong>
                                {` (${book.source})`}
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
