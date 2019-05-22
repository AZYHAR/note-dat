import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store';
import { App } from './App';
import { setAuthHeader } from './_helpers';
import { setInterceptors } from './_helpers/axios.interceptor';


//On app load, checks if logged in and sets up Authentication header
if(localStorage.getItem('user')){
    setAuthHeader();
    setInterceptors();
}

render(
    // Cover app Component with <Provider> to give access to the Redux Store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);