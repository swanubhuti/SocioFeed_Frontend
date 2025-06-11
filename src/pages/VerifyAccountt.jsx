import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import LoadingSpinner from './../components/shared/LoadingSpinner';

export default function VerifyAccount() {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState('idle');

	useEffect(() => {
		const token = params.get('token');

		const verify = async () => {
			setStatus('loading');
			try {
				const res = await axios.get(`/api/verify-account/${token}`, {
					maxRedirects: 5,
				});
				console.log('Backend Response:', res);
				if (res.data.success) {
					setStatus('success');
					setTimeout(() => navigate('/'), 1500);
				}
			} catch (err) {
				setStatus(err, 'error');
			}
		};

		if (token) verify();
		else setStatus('error');
	});

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900">
			{status === 'loading' && (
				<>
					<CircularProgress className="mb-4" />
					<Typography variant="h6" className="text-purple-700 dark:text-white">
						Verifying your account...
					</Typography>
				</>
			)}
			{status === 'success' && (
				<Typography className="text-green-600 dark:text-green-400">
					Account verified! Redirecting to home...
				</Typography>
			)}
			{status === 'error' && (
				<Typography className="text-red-500 dark:text-red-400">
					<LoadingSpinner />
				</Typography>
			)}
		</div>
	);
}
