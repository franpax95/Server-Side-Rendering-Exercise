import React from 'react';
import serialize from 'serialize-javascript';
import App from './components/App';

import { Provider } from 'react-redux';
import createStore from './store';
import { setAge, fetchFriends } from './reducers/person';

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const reactDOMServer = require('react-dom/server');
const { renderToString } = reactDOMServer;


let app = express();
app.server = http.createServer(app);

app.use(
    '/static', 
    express.static(path.resolve('build/static'))
);

app.use(
    '/main.css',
    express.static(path.resolve('build/main.css'))
);

app.use(
    '/bundle.js', 
    express.static(path.resolve('build/bundle.js'))
);

/**
 * dummy API endpoint which returns an array with the names of five of the friends of John Doe with delay
 */
app.get('/api/friends', (req, res) => {
    // setTimeout(() => {
    //     res.json({
    //         "friends": [ 'James', 'Eric', 'Olivia', 'Emma', 'Charlotte' ]
    //     });
    // }, 1000);

    res.json({
        "friends": [ 'James', 'Eric', 'Olivia', 'Emma', 'Charlotte' ]
    });
})

app.get('*', (req, res) => {
    const filePath = path.resolve('build', 'index.html');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err){
            console.error(err);
            res.status(404).send('Error: 404');
        }

        const store = createStore();
        const promises = [
            store.dispatch(setAge(75)),
            store.dispatch(fetchFriends())
        ];

        Promise
            .all(promises)
            .then(() => {
                const reactHtml = renderToString(
                    <Provider store={store}>
                        <App />
                    </Provider>
                );
        
                const html = data
                    .replace('{{HTML}}', reactHtml)
                    .replace('{{INITIAL_STATE}}', serialize(store.getState()), { isJson: true });
                res.status(200).send(html);
            });
    });
});

const port = process.env.PORT || 8080;
app.server.listen(port);
console.log(`Listening on port ${port}`);