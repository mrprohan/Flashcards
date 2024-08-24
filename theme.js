'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' if you prefer dark mode
    primary: {
      main: '#1976d2', // You can change this to your preferred primary color
    },
    secondary: {
      main: '#dc004e', // You can change this to your preferred secondary color
    },
    // Instead of defining custom colors, we'll use these for now
  },
});

export default theme;