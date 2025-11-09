import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export function useTheme() {
  // Initialiser avec la préférence système ou localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('zenmenu-theme') as Theme;
    if (saved) return saved;
    
    // Détecter la préférence système
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Sauvegarder dans localStorage
    localStorage.setItem('zenmenu-theme', theme);
    
    // Appliquer la classe au document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
