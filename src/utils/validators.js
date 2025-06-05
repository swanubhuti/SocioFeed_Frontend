import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(2, 'Must be at least 2 characters')
		.matches(/^[a-zA-Z0-9_]+$/, 'Alphanumeric only'),
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
