import { createSlice } from '@reduxjs/toolkit';

interface ErrorInitState {
    error: string;
}

const initialState: ErrorInitState = {
    error: 'unknown error',
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            return action.payload;
        },
        clearError: () => {
            return initialState;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state: ErrorInitState) => state.error;
export default errorSlice.reducer;
