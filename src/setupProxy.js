const {createProxyMiddleware} = require('http-proxy-middleware');

// /api/intern/arkiv -> fint-flyt-archive-gateway
// /api/intern/metadata -> fint-flyt-discovery-service
// /api/intern/konfigurasjoner -> fint-flyt-configuration-service
// /api/intern/sakstittel -> ikke i bruk lenger (tilhørte data-service som nå er flyttet til archive-gateway)
// /api/intern/historikk -> fint-flyt-history-service
// /api/intern/integrasjoner -> fint-flyt-integration-service
// /api/intern/handlinger/instanser -> fint-flyt-instance-service
// /api/intern/value-convertings -> fint-flyt-value-converting-service
// /api/intern/authorization -> fint-flyt-authorization-service

let proxies = [
    {context: '/api/intern/arkiv', target: 'http://localhost:8085/beta/vlfk-no'},
    {context: '/api/intern/metadata', target: 'http://localhost:8084/beta/vlfk-no'},
    {context: '/api/intern/konfigurasjoner', target: 'http://localhost:8082/beta/vlfk-no'},
    // {context: '/api/intern/sakstittel', target: 'http://localhost:8085'},
    {context: '/api/intern/historikk', target: 'http://localhost:8083/beta/vlfk-no'},
    {context: '/api/intern/integrasjoner', target: 'http://localhost:8090/beta/vlfk-no'},
    {context: '/api/intern/handlinger/instanser', target: 'http://localhost:8081/beta/vlfk-no'},
    {context: '/api/intern/value-convertings', target: 'http://localhost:8094/beta/vlfk-no'},
    {context: '/api/intern/authorization', target: 'http://localhost:8086/beta/vlfk-no'}
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
