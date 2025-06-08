'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  iconColor?: string;
}

export default function ThemeToggle({ iconColor = 'inherit' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        disabled
        data-testid="theme-toggle-loading"
        aria-label="Theme toggle loading"
        size="medium"
        sx={{ color: iconColor }}
      >
        <Moon className="h-5 w-5" />
      </IconButton>
    );
  }

  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <IconButton
      onClick={() => setTheme(nextTheme)}
      data-testid="theme-toggle"
      aria-label={`Switch to ${nextTheme} mode. Currently in ${theme} mode.`}
      title={`Switch to ${nextTheme} mode`}
      size="medium"
      sx={{ color: iconColor }}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </IconButton>
  );
}
