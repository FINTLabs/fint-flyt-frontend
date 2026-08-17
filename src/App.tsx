import './global.css';

import { ThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router';

import Main from './pages/Main';
import { APIAdapterProvider } from './shared/api/ApiAdapterContext';
import AuthorizationProvider from './shared/context/AuthorizationContext';
import IntegrationProvider from './shared/context/IntegrationContext';
import SourceApplicationProvider from './shared/context/SourceApplicationContext';
import theme from './shared/util/styles/theme/theme';
const BASE_PATH = process.env.BASE_PATH || '/'

function App() {
    const basePath: string = useMemo(() => (BASE_PATH ? BASE_PATH : '/'), []);

    return basePath ? (
        <APIAdapterProvider>
            <ThemeProvider theme={theme}>
                <AuthorizationProvider basePath={basePath}>
                    <SourceApplicationProvider>
                        <IntegrationProvider>
                            <BrowserRouter basename={basePath}>
                                <Main />
                            </BrowserRouter>
                        </IntegrationProvider>
                    </SourceApplicationProvider>
                </AuthorizationProvider>
            </ThemeProvider>
        </APIAdapterProvider>
    ) : (
        <h1>Laster...</h1>
    );
}

export default App;
