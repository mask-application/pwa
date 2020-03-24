import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import Store from "./redux/Store";
import {intl} from "./intl";
import {RawIntlProvider} from "react-intl";
import theme from "./theme";
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";

ReactDOM.render(
    <Provider store={Store}>
        <RawIntlProvider value={intl.reactIntl}>
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <Router>
                        <App/>
                    </Router>
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
