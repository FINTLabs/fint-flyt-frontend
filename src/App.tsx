import React, {useContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import Main from "./features/main/Main";
import {BrowserRouter} from "react-router-dom";
import ResourcesProvider from "./context/resourcesContext";
import IntegrationProvider from "./context/integrationContext";
import SourceApplicationProvider, {SourceApplicationContext} from "./context/sourceApplicationContext";
import HistoryProvider from "./context/historyContext";
import axios from "axios";

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
    const [basePath, setBasePath] = useState<string | undefined>(undefined);

    const fetchBasePath = async () => {
        await axios.get<any>('api/application/configuration')
            .then(value => {
                axios.defaults.baseURL = value.data.basePath;
                setBasePath(value.data.basePath);
            })
            .catch(reason => {
                console.log(reason);
                setBasePath('/');
            })
    }


    useEffect(() => {
        fetchBasePath();
         }, []);

    console.log(basePath)

    return basePath ?
        (
            <ThemeProvider theme={theme}>
                <ResourcesProvider>
                    <HistoryProvider>
                        <SourceApplicationProvider>
                            <IntegrationProvider>
                                <BrowserRouter basename={basePath}>
                                    <Main/>
                                </BrowserRouter>
                            </IntegrationProvider>
                        </SourceApplicationProvider>
                    </HistoryProvider>
                </ResourcesProvider>
            </ThemeProvider>
        )
        : <h1>Loading</h1>

}

export default App;
