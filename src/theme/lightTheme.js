// lightTheme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#6D28D9', // Tailwind's purple-700
		},
		background: {
			default: '#f9fafb', // Tailwind's gray-50
			paper: '#ffffff',
		},
		text: {
			primary: '#1f2937', // Tailwind's gray-900 for general text
			secondary: '#4b5563', // Tailwind's gray-600 for secondary text
		},
	},
});

export default lightTheme;
