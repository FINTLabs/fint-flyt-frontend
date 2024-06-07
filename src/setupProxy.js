import { createProxyMiddleware } from 'http-proxy-middleware';

let proxies = [
    {context: '/api/intern/arkiv', target: 'http://localhost:8085'},
    {context: '/api/intern/metadata', target: 'http://localhost:8084'},
    {context: '/api/intern/konfigurasjoner', target: 'http://localhost:8082'},
    {context: '/api/intern/sakstittel', target: 'http://localhost:8085'},
    {context: '/api/intern/historikk', target: 'http://localhost:8083'},
    {context: '/api/intern/integrasjoner', target: 'http://localhost:8090'},
    {context: '/api/intern/handlinger/instanser', target: 'http://localhost:8081'},
    {context: '/api/intern/value-convertings', target: 'http://localhost:8094'},
    {context: '/api/intern/authorization', target: 'http://localhost:8086'}
];

module.exports = function (app) {
    proxies.forEach((proxy) => {
        app.use(
            createProxyMiddleware(proxy.context, {
                target: proxy.target,
                changeOrigin: true,
                headers: {
                    Connection: "keep-alive"
                }
            })
        )
    })
}
