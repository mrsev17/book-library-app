import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootState {
    filter: FilterState;
}

interface FilterState {
    title: string;
    author: string;
}

const initialState: FilterState = {
    title: '',
    author: '',
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
        resetFilters(state) {
            return initialState;
        },
    },
});

export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectAuthorFilter = (state: RootState) => state.filter.author;

export const { setTitleFilter, setAuthorFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
