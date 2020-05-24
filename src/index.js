import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';

import { Provider } from 'react-redux';
import createStore from './store';


setTimeout(() => {
    const initialState = window.__INITIAL_STATE__ || {};
    const store = createStore(initialState);

    ReactDOM.hydrate(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}, 2000);
