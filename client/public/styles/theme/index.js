import { createMuiTheme } from '@material-ui/core/styles';

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#a6ceee',
    },
    secondary: {
      main: '#e9edf2',
    },
    error: {
      main: '#a6ceee',
    },
    action: {
      active: '#a6ceee',
      hover: '#4c4c4c',
      selected: '#a6ceee',
    },
    typography: {
      fontFamily: [
        'Roboto',
        '"Segoe UI"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    type: 'dark',
  },
});
