import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../features/auth/authSlice';
import axiosInstance from '../api/axiosInstance';

const useAuth = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axiosInstance.get('/api/me');
				dispatch(setUser(data.user));
			} catch (error) {
				dispatch(error, clearUser());
			}
		};
		fetchUser();
	}, []);

	return null;
};

export default useAuth;
