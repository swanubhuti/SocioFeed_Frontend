import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
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
