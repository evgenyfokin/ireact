const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://fokin-collections-80e49a476c50.herokuapp.com',
            changeOrigin: true,
        })
    );
};