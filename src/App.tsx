import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import Main from "./features/main/Main";
import {BrowserRouter} from "react-router-dom";
import ResourcesProvider from "./resourcesContext";
import IntegrationProvider from "./integrationContext";

const theme = createTheme({
    palette: {
        secondary: {
            light: '#7fb434',
            main: '#5FA202',
            dark: '#427101',
        },
        primary: {
            light: '#4b727a',
            main: '#1F4F59',
            dark: '#15373e',
        },
    },
    spacing: 8,
    typography: {
        fontFamily: [
            "Nunito Sans", 'sans-serif'
        ].join(',')
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ResourcesProvider>
                <IntegrationProvider>
                    <BrowserRouter>
                        <Main/>
                    </BrowserRouter>
                </IntegrationProvider>
            </ResourcesProvider>
        </ThemeProvider>
    );
}

export default App;
