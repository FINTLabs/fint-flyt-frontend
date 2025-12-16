import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import './global.css';
import theme from './util/styles/theme/theme';
import Main from './components/pages/Main';
import { APIAdapterProvider } from './context/ApiAdapterContext';
import AuthorizationProvider from './context/AuthorizationContext';
import IntegrationProvider from './context/IntegrationContext';
import SourceApplicationProvider from './context/SourceApplicationContext';
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
