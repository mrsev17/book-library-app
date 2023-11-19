import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootState {
    filter: FilterState;
}

interface FilterState {
    title: string;
    author: string;
    onlyFavorite: boolean;
}

const initialState: FilterState = {
    title: '',
    author: '',
    onlyFavorite: false,
};

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setAuthorFilter(state, action: PayloadAction<string>) {
            state.author = action.payload;
        },
        setFavoriteFilter(state) {
            state.onlyFavorite = !state.onlyFavorite;
        },
        resetFilters() {
            return initialState;
        },
    },
});

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectAuthorFilter = (state: RootState) => state.filter.author;
export const selectFavoriteFilter = (state: RootState) => state.filter.onlyFavorite;

export const { setTitleFilter, setAuthorFilter, setFavoriteFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
