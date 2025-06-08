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
      paper: '#f5f5f5',
    },
    text: {
      primary: '#171717',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'var(--font-source-sans-pro), sans-serif',
    h1: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
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
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ededed',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'var(--font-source-sans-pro), sans-serif',
    h1: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h2: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h3: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h4: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h5: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
    h6: {
      fontFamily: 'var(--font-playfair), serif',
      fontWeight: 400,
    },
  },
});
