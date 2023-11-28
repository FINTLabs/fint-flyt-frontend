import {createProxyMiddleware} from 'http-proxy-middleware';

// eslint-disable-next-line no-undef
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api/intern/arkiv', {
            target: 'http://localhost:8085',
            changeOrigin: true,
            pathRewrite: {"^/api1": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/metadata', {
            target: 'http://localhost:8084',
            changeOrigin: true,
            pathRewrite: {"^/api5": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/konfigurasjoner', {
            target: 'http://localhost:8082',
            changeOrigin: true,
            pathRewrite: {"^/api2": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/sakstittel', {
            target: 'http://localhost:8085',
            changeOrigin: true,
            pathRewrite: {"^/api3": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/historikk', {
            target: 'http://localhost:8083',
            changeOrigin: true,
            pathRewrite: {"^/api4": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
    app.use(
        createProxyMiddleware('/api/intern/integrasjoner', {
            target: 'http://localhost:8090',
            changeOrigin: true,
            pathRewrite: {"^/api6": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );

    app.use(
        createProxyMiddleware('/api/intern/handlinger/instanser', {
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {"^/api7": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );

    app.use(
        createProxyMiddleware('/api/intern/value-convertings', {
            target: 'http://localhost:8094',
            changeOrigin: true,
            pathRewrite: {"^/api8": ""},
            headers: {
                Connection: "keep-alive"
            }
        })
    );
}
