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
const VITE_BASE_PATH = import.meta.env.BASE_URL
const BASE_PATH = process.env.VITE_BASE_PATH || '/'
const MODE = import.meta.env.MODE || '';
const BASE_PATH_VITE = import.meta.env.VITE_BASE_PATH;

function App() {
    console.log('App vite VITE_BASE_PATH:', VITE_BASE_PATH);
    console.log('App node BASE_PATH:', BASE_PATH);
    const basePath: string = useMemo(() => (MODE === 'production' ? BASE_PATH_VITE : '/'), []);
    console.log('App basePath (BASE_PATH_VITE): ', basePath);

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
