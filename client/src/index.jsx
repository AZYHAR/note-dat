import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store';
import { App } from './App';
import { setAuthHeader } from './_helpers';


//On app load, checks if logged in and sets up Authentication header
if(localStorage.getItem('user')){
    setAuthHeader();
}

render(
    // Cover app Component with <Provider> to give access to the Redux Store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);