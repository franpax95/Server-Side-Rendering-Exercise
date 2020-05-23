import React from 'react';
import App from './components/App';

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

app.get('*', (req, res) => {
    const filePath = path.resolve('build', 'index.html');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err){
            console.error(err);
            res.status(404).send('Error: 404');
        }
        const reactHtml = renderToString(<App />);
        const html = data.replace('{{HTML}}', reactHtml);
        res.status(200).send(html);
    });
});

const port = process.env.PORT || 8080;
app.server.listen(port);
console.log(`Listening on port ${port}`);