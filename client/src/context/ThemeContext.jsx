import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Check local storage or prefer-color-scheme, default to 'dark'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('novel-nook-theme');
        if (savedTheme) return savedTheme;
        return 'dark'; // Default premium look
    });

    useEffect(() => {
        // Apply class to body or html
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('novel-nook-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
