import {defineConfig} from "cypress";

export default defineConfig({
    chromeWebSecurity: false,
    video: false,

    e2e: {
        setupNodeEvents(on, config) {
            return require("./cypress/plugins/index.js")(on, config); // eslint-disable-line
        },
        baseUrl: "http://localhost:3000",
        viewportHeight: 1500,
        viewportWidth: 2000,
        experimentalRunAllSpecs: true
    },

    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
    },
});
