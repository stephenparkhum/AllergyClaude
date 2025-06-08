"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { useTheme } from 'next-themes';
import { lightTheme, darkTheme } from '../lib/theme';
import { useEffect, useState } from 'react';

function MUIThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const muiTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
      storageKey="allergy-agents-theme"
    >
      <MUIThemeWrapper>
        {children}
      </MUIThemeWrapper>
    </ThemeProvider>
  );
}