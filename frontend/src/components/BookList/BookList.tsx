import { useAppSelector } from '../../hook';
import { Book, selectBooks } from '../../redux/booksSlice/booksSlice';
import { selectTitleFilter, selectAuthorFilter, selectFavoriteFilter } from '../../redux/filtersSlice/filtersSlice';
import { BookItem } from '../BookItem';
import './BookList.scss';

export const BookList: React.FC = () => {
    const books: Book[] = useAppSelector(selectBooks);
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const authorFilter: string = useAppSelector(selectAuthorFilter);
    const favoriteBooksFilter: boolean = useAppSelector(selectFavoriteFilter);

    const filteredBooks: Book[] = books.filter((book: Book): boolean => {
        const matchesTitle: boolean = book.title.toLowerCase().includes(titleFilter.toLowerCase());
        const matchesAuthor: boolean = book.author.toLowerCase().includes(authorFilter.toLowerCase());
        const matchesFavorite: boolean = favoriteBooksFilter ? book.isFavorite : true;
        return matchesTitle && matchesAuthor && matchesFavorite;
    });

    return (
        <div className='app-block book-list'>
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (
                <ul>
                    {filteredBooks.map(({ id, author, title, isFavorite, source }, i) => (
                        <BookItem key={i} index={i} id={id} author={author} title={title} isFavorite={isFavorite} source={source} />
                    ))}
                </ul>
            )}
        </div>
    );
};
