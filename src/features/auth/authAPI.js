import axios from '../../api/axiosInstance';

export const registerUser = (data) => axios.post('/api/register', data);
export const loginUser = (data) => axios.post('/api/login', data);
export const logoutUser = () => axios.get('/api/logout');
export const forgotPassword = (data) =>
	axios.post('/api/forgot-password', data);
export const resetPassword = (data, token) =>
	axios.post(`/api/reset-password/${token}`, data);

export const verifyAccount = (token) =>
	axios.get(`/api/verify-account/${token}`);
