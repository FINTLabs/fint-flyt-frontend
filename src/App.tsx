import React from 'react';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import './global.css';
import theme from './util/styles/theme/theme';
import Main from './components/pages/Main';
import { APIAdapterProvider } from './context/ApiAdapterContext';
import AuthorizationProvider from './context/AuthorizationContext';
import IntegrationProvider from './context/IntegrationContext';
import SourceApplicationProvider from './context/SourceApplicationContext';
const VITE_BASE_PATH = import.meta.env.VITE_BASE_PATH || '/';
const BASE_PATH = process.env.VITE_BASE_PATH || '/'

function App() {
    console.log('App basePath: ', BASE_PATH);
    console.log('App vite BASE_URL:', import.meta.env.BASE_URL);
    console.log('App node BASE_PATH:', process.env.VITE_BASE_PATH);

    return BASE_PATH ? (
        <APIAdapterProvider>
            <ThemeProvider theme={theme}>
                <AuthorizationProvider basePath={BASE_PATH}>
                    <SourceApplicationProvider>
                        <IntegrationProvider>
                            <BrowserRouter basename={BASE_PATH}>
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
