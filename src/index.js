import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { RawIntlProvider } from "react-intl";
import { create } from 'jss';
import rtl from 'jss-rtl';

import { ThemeProvider } from "@material-ui/core";
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// FIXME merge these styles and move them to a central style (Sass)
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import Store from "./redux/Store";
import { intl } from "./intl";
import theme from "./theme";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
    <Provider store={Store}>
        <RawIntlProvider value={intl.reactIntl}>
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <StylesProvider jss={jss}>
                        <Router>
                            <App />
                        </Router>
                    </StylesProvider>
                </ThemeProvider>
            </React.StrictMode>
        </RawIntlProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
