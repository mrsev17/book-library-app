import { useAppSelector, useAppDispatch } from '../../hook';
import { setRemoveBook, setToggleFavorite } from '../../redux/booksSlice/booksSlice';
import { selectTitleFilter, selectAuthorFilter } from '../../redux/filtersSlice/filtersSlice';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';

interface BookItemProps {
    id: string;
    source?: string;
    title: string;
    author: string;
    isFavorite: boolean;
    index: number;
}

export const BookItem: React.FC<BookItemProps> = ({ id, source, title, author, isFavorite, index }) => {
    const dispatch = useAppDispatch();
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const authorFilter: string = useAppSelector(selectAuthorFilter);

    const deleteHandle = (id: string): void => {
        dispatch(setRemoveBook(id));
    };
    const favoriteBookHandle = (id: string): void => {
        dispatch(setToggleFavorite(id));
    };

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
        <li>
            <div className='book-info'>
                {++index}. {highlightMatch(title, titleFilter)} by <strong>{highlightMatch(author, authorFilter)}</strong>
                {` (${source})`}
            </div>
            <div className='book-actions'>
                <span onClick={() => favoriteBookHandle(id)}>
                    {isFavorite ? <BsBookmarkStarFill className='star-icon' /> : <BsBookmarkStar className='star-icon' />}
                </span>
                <button type='button' onClick={() => deleteHandle(id)}>
                    Delete
                </button>
            </div>
        </li>
    );
};
