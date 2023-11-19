import { useAppDispatch, useAppSelector } from '../../hook';
import {
    setTitleFilter,
    setAuthorFilter,
    setFavoriteFilter,
    resetFilters,
    selectTitleFilter,
    selectAuthorFilter,
    selectFavoriteFilter,
} from '../../redux/filtersSlice/filtersSlice';
import { AppDispatch } from '../../redux/store';

import './Filter.scss';

export const Filter: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();

    const titleFilter: string = useAppSelector(selectTitleFilter);
    const authorFilter: string = useAppSelector(selectAuthorFilter);
    const onlyFavoriteFilter: boolean = useAppSelector(selectFavoriteFilter);

    const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setTitleFilter(e.target.value));
    };
    const handleAuthorFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setAuthorFilter(e.target.value));
    };
    const handleFavoriteBooksFilter = (): void => {
        dispatch(setFavoriteFilter());
    };
    const handleResetFilters = (): void => {
        dispatch(resetFilters());
    };
    return (
        <div className='app-block filter'>
            <div className='filter-row'>
                <div className='filter-group'>
                    <input type='text' value={titleFilter} placeholder='Filter by title...' onChange={handleTitleFilterChange} maxLength={18} />
                </div>
                <div className='filter-group'>
                    <input type='text' value={authorFilter} placeholder='Filter by author...' onChange={handleAuthorFilterChange} maxLength={18} />
                </div>
                <div className='filter-group'>
                    <label>
                        <input type='checkbox' checked={onlyFavoriteFilter} onChange={handleFavoriteBooksFilter} />
                        Only Favorite
                    </label>
                </div>
            </div>
            <button type='button' onClick={handleResetFilters}>
                Reset Filters
            </button>
        </div>
    );
};
