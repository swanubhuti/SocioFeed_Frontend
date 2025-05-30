// darkTheme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#8b5cf6', // Tailwind's purple-600
		},
		background: {
			default: '#0f172a', // Tailwind's slate-900
			paper: '#1e293b', // Often good to define a slightly lighter paper for dark mode
		},
		text: {
			primary: '#e2e8f0', // Tailwind's slate-200 for general text
			secondary: '#94a3b8', // Tailwind's slate-400 for secondary text
		},
	},
});

export default darkTheme;
