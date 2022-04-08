const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration 
const PORT = 3007;
const HOST = "localhost";
const SERVICE_URL = process.argv[2];

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});


// Proxy endpoints
app.use('/', createProxyMiddleware({
    target: SERVICE_URL,
    changeOrigin: true,
    hostRewrite:true,
    pathRewrite: {
        [`^/`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});