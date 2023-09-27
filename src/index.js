import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import {createStore, applyMiddleware} from "redux";
import { configureStore } from '@reduxjs/toolkit'
// import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";

import App from './component/App/App.jsx';

import reducer from "./reducer/reducer.js";


// import './sass/styles.scss';

const store = configureStore({ reducer, middleware: [thunk] });

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById(`root`)
);
