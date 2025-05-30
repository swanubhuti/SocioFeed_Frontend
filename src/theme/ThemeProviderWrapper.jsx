import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext.js';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

export default function ThemeProviderWrapper({ children }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
          {children}
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
