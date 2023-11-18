import { v4 as uuidv4 } from 'uuid';
import { Book } from '../redux/booksSlice/booksSlice';

interface createBook {
    year?: number;
    title: string;
    author: string;
}
const createBookWithID = (book: createBook): Book => {
    return {
        ...book,
        isFavorite: false,
        id: uuidv4(),
    };
};

export default createBookWithID;
