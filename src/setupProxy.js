const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/kodeverk', {
            target: 'http://localhost:8085', // API endpoint 1
            changeOrigin: true,
            pathRewrite: {"^/api1": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/integration/configuration', {
            target: 'http://localhost:8082', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api2": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/sak', {
            target: 'http://localhost:8085', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api3": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/sakshistorikk/hendelser', {
            target: 'http://localhost:8084', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api4": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
}