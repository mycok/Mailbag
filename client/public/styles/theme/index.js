import { createMuiTheme } from '@material-ui/core/styles';

export const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#212121',
    },
    error: {
      main: '#212121',
    },
    action: {
      active: '#212121',
      hover: '#4c4c4c',
      selected: '#212121',
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
