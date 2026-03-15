import { useState, useEffect } from 'react';

const KEY = 'yana_dark_mode';

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem(KEY) === 'true'; }
    catch { return false; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(KEY, String(dark));
  }, [dark]);

  const toggle = () => setDark((d) => !d);
  return { dark, toggle };
}
