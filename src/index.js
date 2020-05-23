import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';

setTimeout(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
}, 1000);
