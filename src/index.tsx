import App from './App';
import reportWebVitals from './reportWebVitals';
import './util/locale/i18n.ts';
import {createRoot} from 'react-dom/client';
import {FlagProvider} from '@unleash/proxy-client-react';
import React from 'react';

const config = {
    url: 'https://unleash-beta.fintlabs.no/api/frontend',
    clientKey: 'default:development.a3972cefff6ec8bde29ae0bc43d8c7402ce536c5299445dc19d465aa',
    refreshInterval: 15,
    appName: 'fint-flyt-integration-frontend',
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <FlagProvider config={config}>
            <App/>
        </FlagProvider>
    );
}
reportWebVitals();
