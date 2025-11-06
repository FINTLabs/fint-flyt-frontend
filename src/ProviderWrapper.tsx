import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import IntegrationProvider from './context/IntegrationContext';
import SourceApplicationProvider from './context/SourceApplicationContext';
import theme from './util/styles/theme/theme';
import './global.css';
import AuthorizationProvider from './context/AuthorizationContext';
import { ApiAdapterContext } from './context/ApiAdapterContext';

function ProviderWrapper({ children }: { children?: React.ReactNode }) {
    const { baseURL } = useContext(ApiAdapterContext);

    return baseURL ? (
        <ThemeProvider theme={theme}>
            <AuthorizationProvider basePath={baseURL}>
                <SourceApplicationProvider>
                    <IntegrationProvider>
                        <BrowserRouter basename={baseURL}>{children}</BrowserRouter>
                    </IntegrationProvider>
                </SourceApplicationProvider>
            </AuthorizationProvider>
        </ThemeProvider>
    ) : (
        <h1>Laster...</h1>
    );
}

export default ProviderWrapper;
