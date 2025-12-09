import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router';
import IntegrationProvider from './context/IntegrationContext';
import SourceApplicationProvider from './context/SourceApplicationContext';
import theme from './util/styles/theme/theme';
import './global.css';
import AuthorizationProvider from './context/AuthorizationContext';
const BASE_PATH = import.meta.env.BASE_PATH || '/';

function ProviderWrapper({ children }: { children?: React.ReactNode }) {

    return BASE_PATH ? (
        <ThemeProvider theme={theme}>
            <AuthorizationProvider basePath={BASE_PATH}>
                <SourceApplicationProvider>
                    <IntegrationProvider>
                        <BrowserRouter basename={BASE_PATH}>{children}</BrowserRouter>
                    </IntegrationProvider>
                </SourceApplicationProvider>
            </AuthorizationProvider>
        </ThemeProvider>
    ) : (
        <h1>Laster...</h1>
    );
}

export default ProviderWrapper;
