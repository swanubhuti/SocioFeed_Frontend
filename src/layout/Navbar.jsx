import { Link } from 'react-router-dom';
import { useThemeContext } from '../theme/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
	const { isDark, setIsDark } = useThemeContext();

	return (
		<nav className="p-3 shadow bg-purple-100 dark:bg-slate-900 flex justify-between items-center">
			<Link
				to="/"
				className="font-bold mx-11  md:mx-2 text-2xl text-purple-900 dark:text-purple-300 "
			>
				SocioFeed
			</Link>
			<div className="flex items-center space-x-4">
				<button
					onClick={() => setIsDark(!isDark)}
					className="p-2 rounded-full bg-purple-700 text-white shadow"
					title="Toggle Theme"
				>
					{isDark ? <Sun size={20} /> : <Moon size={20} />}
				</button>
			</div>
		</nav>
	);
}
