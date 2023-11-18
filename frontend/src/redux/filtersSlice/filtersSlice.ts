import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface filterState {
    title: string;
}

const initialState: filterState = {
    title: '',
};

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        resetFilters(state) {
            return initialState;
        },
    },
});

export const selectTitleFilter = (state: any) => state.filter.title;

export const { setTitleFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
