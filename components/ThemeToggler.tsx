import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;
  return (
    <button
      className="text-primary p-1 rounded-xl hover:border-secondary border-2 shadow mr-10"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <>
        {theme === 'dark' ? (
          <FiSun className="text-white text-2xl" />
        ) : (
          <FiMoon className="text-2xl   text-gray-900" />
        )}
      </>
    </button>
  );
}

export default ThemeToggler;
