import axios from 'axios';
import { clearUser } from '../features/auth/authSlice';

import { useDispatch } from 'react-redux';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true, // Ensures cookies are sent
	headers: { 'Content-Type': 'application/json' },
});

// Read cookies correctly
const getCookie = (name) => {
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
	return match ? match[2] : null;
};

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = getCookie('token');

		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const { data } = await axios.get('http://localhost:8080/api/refresh', {
					withCredentials: true,
				});

				// No need to manually set token cookie if backend sets it properly
				axiosInstance.defaults.headers['Authorization'] =
					`Bearer ${data.accessToken}`;
				originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

				return axiosInstance(originalRequest);
			} catch (_error) {
				const dispatch = useDispatch();
				dispatch(clearUser());
				window.location.href = '/login';
				return Promise.reject(_error);
			}
		}

		return Promise.reject(error);
	}
);
export default axiosInstance;
