import { Link } from 'react-router-dom';
import { useThemeContext } from '../theme/ThemeContext';
import { Sun, Moon } from 'lucide-react'; // You can also use Heroicons or any icon library

export default function Navbar() {
  const { isDark, setIsDark } = useThemeContext();

  return (
    <nav className="p-4 shadow bg-white dark:bg-slate-900 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl text-purple-800 dark:text-purple-300">
        SocioFeed
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-slate-800 dark:text-slate-200">Login</Link>
        <Link to="/register" className="text-slate-800 dark:text-slate-200">Register</Link>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-purple-600 text-white shadow"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
