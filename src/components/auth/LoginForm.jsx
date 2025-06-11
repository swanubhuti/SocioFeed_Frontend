import { useForm } from 'react-hook-form';
import { loginUser, forgotPassword } from '../../features/auth/authAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';
import toast from 'react-hot-toast';

export default function LoginForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState('');
	const [openReset, setOpenReset] = useState(false);
	const [resetEmail, setResetEmail] = useState('');
	const [resetMsg, setResetMsg] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const res = await loginUser(data);
			dispatch(setUser(res.data.user));

			toast.success('Login successful!');
			navigate('/');
		} catch (err) {
			const message =
				err.response?.data?.message || 'Incorrect email or password';
			toast.error(message);
		}
	};

	const handleResetPassword = async () => {
		try {
			const res = await forgotPassword({ email: resetEmail });
			toast.success(res.data.message);
		} catch (err) {
			const message =
				err.response?.data?.message || 'Failed to send reset link';
			toast.error(message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
				{errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

				<Input
					label="Email"
					type="email"
					{...register('email', { required: 'Email is required' })}
					error={errors.email?.message}
				/>
				<PasswordInput
					label="Password"
					{...register('password')}
					error={errors.password?.message}
				/>

				<div className="text-right">
					<button
						type="button"
						onClick={() => setOpenReset(true)}
						className="text-md text-purple-700 hover:underline"
					>
						Forgot Password?
					</button>
				</div>

				<Button type="submit" className="w-full ">
					Login
				</Button>

				<p className="text-center">
					Don’t have an account?{' '}
					<Link to="/register" className="text-purple-700 hover:underline">
						Register
					</Link>
				</p>
			</form>

			<Dialog open={openReset} onClose={() => setOpenReset(false)}>
				<DialogTitle>Reset Password</DialogTitle>
				<DialogContent className="space-y-4">
					{resetMsg && <p className="text-green-600">{resetMsg}</p>}
					<Input
						label="Enter your email"
						value={resetEmail}
						onChange={(e) => setResetEmail(e.target.value)}
					/>
					<Button type="button" onClick={handleResetPassword}>
						Send Reset Link
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
}
