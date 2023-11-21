import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ErrorInitState {
    error: string;
}

const initialState: ErrorInitState = {
    error: '',
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: () => {
            return initialState;
        },
    },
});

export const selectErrorMessage = (state: RootState) => state.errors.error;

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
