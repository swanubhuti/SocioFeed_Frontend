/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				purple: {
					700: '#6D28D9',
					800: '#5B21B6',
					900: '#4C1D95',
				},
			},
		},
	},
	plugins: [],
};
