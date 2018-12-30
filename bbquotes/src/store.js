// import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';


const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, // coming from our created reducers ./reducers/......
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()// redux dev tool chrome
    ));


export default store;