'use client';

import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F6F8C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#BBD8F2',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#171717',
      secondary: '#666666',
    },
    success: {
      main: '#059669',
      light: '#10b981',
      dark: '#047857',
    },
    warning: {
      main: '#d97706',
      light: '#f59e0b',
      dark: '#b45309',
    },
    error: {
      main: '#dc2626',
      light: '#ef4444',
      dark: '#b91c1c',
    },
  },
  typography: {
    fontFamily: 'var(--font-source-sans-pro), sans-serif',
    h1: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          fontSize: '1rem',
          minHeight: 44,
          '@media (max-width: 768px)': {
            minHeight: 48,
            fontSize: '1.1rem',
            padding: '16px 24px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          '@media (max-width: 768px)': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '@media (max-width: 768px)': {
              borderRadius: 8,
              fontSize: '1.1rem',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          '@media (max-width: 768px)': {
            fontSize: '0.9rem',
            height: 32,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            '@media (max-width: 768px)': {
              fontSize: '1rem',
              minHeight: 48,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '@media (max-width: 768px)': {
            padding: 12,
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4F6F8C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#BBD8F2',
      contrastText: '#000000',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ededed',
      secondary: '#b0b0b0',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
  },
  typography: {
    fontFamily: 'var(--font-source-sans-pro), sans-serif',
    h1: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-source-sans-pro), sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          fontSize: '1rem',
          minHeight: 44,
          '@media (max-width: 768px)': {
            minHeight: 48,
            fontSize: '1.1rem',
            padding: '16px 24px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          '@media (max-width: 768px)': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '@media (max-width: 768px)': {
              borderRadius: 8,
              fontSize: '1.1rem',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          '@media (max-width: 768px)': {
            fontSize: '0.9rem',
            height: 32,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            '@media (max-width: 768px)': {
              fontSize: '1rem',
              minHeight: 48,
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '@media (max-width: 768px)': {
            padding: 12,
          },
        },
      },
    },
  },
});
