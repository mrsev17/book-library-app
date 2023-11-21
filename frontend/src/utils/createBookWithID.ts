import { v4 as uuidv4 } from 'uuid';
import { Book } from '../redux/booksSlice/booksSlice';

interface createBook {
    year?: number;
    title: string;
    author: string;
}
const createBookWithID = (book: createBook, source: string): Book => {
    return {
        ...book,
        source,
        isFavorite: false,
        id: uuidv4(),
    };
};

export default createBookWithID;
