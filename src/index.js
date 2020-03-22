import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import Store from "./redux/Store";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main:'#f7475b',
            light:'#f6263b',
            dark:''
        },
        secondary: {
            light:'#f73378',
            main:'#f50057',
            dark:'#ab003c',
        },
    },
});

ReactDOM.render(
    <Provider store={Store}>
        <ThemeProvider theme={theme}>
        <React.StrictMode>
        <App/>
        </React.StrictMode>
        </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
