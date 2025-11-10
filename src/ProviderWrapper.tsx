import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import IntegrationProvider from './context/IntegrationContext';
import SourceApplicationProvider from './context/SourceApplicationContext';
import theme from './util/styles/theme/theme';
import './global.css';
import AuthorizationProvider from './context/AuthorizationContext';
import { ApiAdapterContext } from './context/ApiAdapterContext';

function ProviderWrapper({ children }: { children?: React.ReactNode }) {
    const { get, setBaseURL } = useContext(ApiAdapterContext);

    const [basePath, setBasePath] = useState<string | undefined>();

    useEffect(() => {
        get<{basePath: string }>("api/application/configuration")
            .then((value) => {
                console.log("ProviderWrapper - Got something from configuration:", value.data.basePath);
                setBaseURL(value.data.basePath)
                setBasePath(value.data.basePath);
            })
            .catch((reason) => {
                console.log("ProviderWrapper - Error getting config:", reason);
                setBasePath("/")
            });
    }, []);

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
