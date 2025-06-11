import * as yup from 'yup';
import { checkUsernameUniqueness } from '../features/auth/authAPI';

export const registerSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(2, 'Must be at least 2 characters')
		.matches(
			/^[a-zA-Z0-9_]+$/,
			'Username can only contain letters, numbers, and underscores'
		) //Alphanumeric
		.test(
			'check-username-unique',
			'This username is already taken',
			async function (value) {
				if (!value || value.length < 3) {
					return true;
				}
				try {
					const data = await checkUsernameUniqueness(value);
					if (!data.isUnique) {
						return this.createError({
							message: data.message || 'This username is already taken',
						});
					}
					return true;
				} catch (error) {
					const errorMessage =
						error.response?.data?.message ||
						'Error checking username availability';
					return this.createError({ message: errorMessage });
				}
			}
		),
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Must be at least 8 characters')
		.matches(/[A-Z]/, 'Must include an uppercase letter')
		.matches(/[a-z]/, 'Must include a lowercase letter')
		.matches(/[0-9]/, 'Must include a number')
		.matches(/[@$!%*?&#]/, 'Must include a special character'),
	confirmPassword: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password')], 'Passwords must match'),
});
export const profileSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'Username must be at least 3 characters')
		.required('Username is required'),
	bio: yup.string().max(200, 'Bio must be under 200 characters'),
});
