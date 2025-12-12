const { defineConfig } = require('cypress');

module.exports = defineConfig({
    chromeWebSecurity: false,
    video: false,
    e2e: {
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.cjs')(on, config);
        },
        baseUrl: 'http://localhost:3000',
        viewportHeight: 1500,
        viewportWidth: 2000,
        experimentalRunAllSpecs: true,
        env: {
            VITE_BASE_PATH: '/beta/test-no',
        },
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
