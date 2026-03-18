import { useState, useEffect } from 'react';

const KEY = 'yana_dark_mode';

function getInitialDarkMode() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) return stored === 'true';

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

export function useDarkMode() {
  const [dark, setDark] = useState(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(KEY, String(dark));
  }, [dark]);

  const toggle = () => setDark((d) => !d);
  return { dark, toggle };
}
