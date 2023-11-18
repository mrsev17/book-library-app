import { useAppDispatch, useAppSelector } from '../../hook';
import { setTitleFilter, resetFilters, selectTitleFilter } from '../../redux/filtersSlice/filtersSlice';

import './Filter.scss';

export const Filter: React.FC = () => {
    const dispatch = useAppDispatch();
    const titleFilter: string = useAppSelector(selectTitleFilter);
    const handleTitleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setTitleFilter(e.target.value));
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
            </div>
            <button type='button' onClick={handleResetFilters}>
                Reset Filters
            </button>
        </div>
    );
};
