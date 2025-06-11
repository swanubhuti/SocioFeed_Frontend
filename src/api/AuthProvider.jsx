import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, setLoading } from '../features/auth/authSlice';
import axiosInstance from '../api/axiosInstance';

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
        dispatch(setLoading(true));
        try {
            const { data } = await axiosInstance.get('/api/me');
            if (isMounted) {
                dispatch(setUser(data.user));
            }
        } catch (error) {
            if (isMounted) {
                dispatch(clearUser());
            }
        } finally {
            if (isMounted) {
                dispatch(setLoading(false));
            }
        }
    };

    fetchUser(); 

    return () => {
        isMounted = false;
    };
}, [dispatch]); 

    return children;
};

export default AuthProvider;
