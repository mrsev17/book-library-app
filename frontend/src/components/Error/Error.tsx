import { useEffect } from 'react';
import { clearError, selectErrorMessage } from '../../redux/errorSlice/errorSlice';
import { useAppSelector, useAppDispatch } from '../../hook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Error = () => {
    const errorMessage = useAppSelector(selectErrorMessage);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (errorMessage) {
            toast.info(errorMessage);
            dispatch(clearError());
        }
    }, [errorMessage, dispatch]);
    return <ToastContainer position='top-right' autoClose={2000}></ToastContainer>;
};
