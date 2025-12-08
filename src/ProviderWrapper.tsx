import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import IntegrationProvider from './context/IntegrationContext';
import SourceApplicationProvider from './context/SourceApplicationContext';
import theme from './util/styles/theme/theme';
import './global.css';
import AuthorizationProvider from './context/AuthorizationContext';
import { ApiAdapterContext } from './context/ApiAdapterContext';
const BASE_PATH = import.meta.env.BASE_PATH || '/';

function ProviderWrapper({ children }: { children?: React.ReactNode }) {
    const { setBaseURL } = useContext(ApiAdapterContext);

    const [basePath, setBasePath] = useState<string | undefined>();

    useEffect(() => {
        console.log('BASE_PATH: ', BASE_PATH);
        setBaseURL(BASE_PATH);
        setBasePath(BASE_PATH);
    }, [])

    return basePath ? (
        <ThemeProvider theme={theme}>
            <AuthorizationProvider basePath={basePath}>
                <SourceApplicationProvider>
                    <IntegrationProvider>
                        <BrowserRouter basename={basePath}>{children}</BrowserRouter>
                    </IntegrationProvider>
                </SourceApplicationProvider>
            </AuthorizationProvider>
        </ThemeProvider>
    ) : (
        <h1>Laster...</h1>
    );
}

export default ProviderWrapper;
