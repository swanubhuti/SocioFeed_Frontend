import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validators';
import { registerUser } from '../../features/auth/authAPI';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';

export default function RegisterForm() {
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(registerSchema) });

	const onSubmit = async (data) => {
		try {
			const res = await registerUser(data);
			alert(res.data.message);
			navigate('/login');
		} catch (err) {
			setErrorMsg(err.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
			{errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

			<Input
				label="Username"
				{...register('username')}
				error={errors.username?.message}
			/>
			<Input
				label="Email"
				type="email"
				{...register('email')}
				error={errors.email?.message}
			/>
			<PasswordInput
				label="Password"
				{...register('password')}
				error={errors.password?.message}
			/>
			<PasswordInput
				label="Confirm Password"
				{...register('confirmPassword')}
				error={errors.confirmPassword?.message}
			/>

			<Button type="submit" className="w-full  " >
				Register
			</Button>

			<p className="text-center">
				Already have an account?{' '}
				<Link to="/login" className="text-purple-700 hover:underline">
					Login
				</Link>
			</p>
		</form>
	);
}
