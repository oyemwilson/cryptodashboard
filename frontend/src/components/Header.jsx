import React, {memo, useContext} from 'react'
import {ThemeContext} from '../context/ThemeContext';
// Header Component
const Header = memo(() => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log('Header - Theme:', theme, 'ToggleTheme:', toggleTheme);
  return (
    <header className="">
      <button 
        onClick={toggleTheme}
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );
});

// Use "export default" for the main component of the file
export default React.memo(Header);