const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/intern/arkiv', {
            target: 'http://localhost:8085', // API endpoint 1
            changeOrigin: true,
            pathRewrite: {"^/api1": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/metadata', {
            target: 'http://localhost:8084', // API endpoint 5
            changeOrigin: true,
            pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/konfigurasjoner', {
            target: 'http://localhost:8082', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api2": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/sakstittel', {
            target: 'http://localhost:8085', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api3": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/historikk', {
            target: 'http://localhost:8083', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api4": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/integrasjoner', {
            target: 'http://localhost:8090', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api6": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );

    app.use(
        createProxyMiddleware('/api/intern/handlinger/instanser', {
            target: 'http://localhost:8081', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {"^/api7": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
}
