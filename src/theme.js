import { createTheme } from "@mui/material";

export const theme = createTheme({ 
    palette: {
    type: 'light',
    primary: {
      main: '#1e879a',
    },
    secondary: {
      main: '#e85d5d',
    },
    background: {
      default: '#e0f7fa',
    },
    warning: {
      main: '#f57c00',
    },
    error: {
      main: '#ff3500',
    },
    success: {
      main: '#1b5e20',
    },
    divider: 'rgba(183,28,28,0.28)',
    info: {
      main: '#4db6ac',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
  },
  shape: {
    borderRadius: 6,
  },
});