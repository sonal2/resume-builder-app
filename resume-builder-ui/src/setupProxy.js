const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy configuration for requests to '/api'
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
