import App from './App';
import reportWebVitals from './reportWebVitals';
import './util/locale/i18n.ts';
import {createRoot} from 'react-dom/client';
import {FlagProvider} from '@unleash/proxy-client-react';
import React from 'react';

const config = {
    url: 'https://unleash-beta.fintlabs.no/api/frontend',
    clientKey: '',
    refreshInterval: 15,
    appName: 'fint-flyt-integration-frontend',
};

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <FlagProvider config={config}>
                <App/>
            </FlagProvider>
        </React.StrictMode>
    );
}

reportWebVitals();
