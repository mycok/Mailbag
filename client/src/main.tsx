import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core/styles';

import { appTheme } from '../public/styles/theme';
import '../public/styles/css/index.css';

import App from './App';
ReactDOM.render(
    <ThemeProvider theme={appTheme}>
        <App />
    </ThemeProvider>,
document.getElementById('root')
)
