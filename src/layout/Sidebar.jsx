import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiOutlineMessage,
  AiOutlineUser,
  AiOutlineLogout,
} from 'react-icons/ai';
import { BsBookmark } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authAPI';
import { clearUser } from '../features/auth/authSlice';
import { useThemeContext } from '../theme/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Sidebar = ({ setOpen, open }) => {
  const [isMobile, setIsMobile] = useState(false);
  const unreadCount = useSelector((state) => state.chat?.unreadCount || 0);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, setIsDark } = useThemeContext();

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen(); 
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(clearUser());
      navigate('/login');
      setOpen?.(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { to: '/', label: 'Home', icon: <AiOutlineHome /> },
    { to: '/search', label: 'Search', icon: <AiOutlineSearch /> },
    { to: '/new-post', label: 'New Post', icon: <AiOutlinePlusCircle /> },
    {
      to: '/chat',
      label: 'Chats',
      icon: (
        <div className="relative">
          <AiOutlineMessage />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </div>
      ),
    },
    {
      to: `/profile/${user?.username}`,
      label: 'Profile',
      icon: <AiOutlineUser />,
    },
    { to: '/saved', label: 'Saved', icon: <BsBookmark /> },
    {
      to: '/login',
      label: 'Logout',
      icon: <AiOutlineLogout />,
      onClick: handleLogout,
      isLogout: true,
    },
  ];

  if (isMobile && !open) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t dark:border-slate-700 flex justify-around items-center py-2 z-40 md:hidden">
        {navItems.slice(0, 5).map((item) =>
          item.isLogout ? null : (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen?.(false)}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center text-xs ${
                  isActive
                    ? 'text-purple-700 dark:text-purple-300'
                    : 'text-gray-500 dark:text-gray-400'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
            </NavLink>
          )
        )}
      </nav>
    );
  }

  return (
    <aside className="flex flex-col w-64 bg-purple-50 dark:bg-slate-900 border-r dark:border-slate-700 shadow-md h-full z-50">
      <Link
        to="/"
        className="font-bold mt-4 mb-2 px-6 text-3xl text-purple-900 dark:text-purple-300"
      >
        SocioFeed
      </Link>

      <nav className="flex-1 px-4 py-4 space-y-4">
        {navItems.map((item) =>
          item.isLogout ? (
            <button
              key={item.to}
              onClick={item.onClick}
              className="flex w-full items-center gap-3 px-4 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen?.(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          )
        )}
      </nav>

      <div className="flex items-center mx-7 mb-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 mt-25 rounded-full bg-purple-700 text-white shadow"
          title="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
