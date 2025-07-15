'use client';

import { useTheme } from '../../../hooks/use-theme';

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`todo-app__theme-toggle ${className}`}
            aria-pressed={theme === 'dark'}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <span>
                {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="todo-app__theme-text">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
        </button>
    );
}
