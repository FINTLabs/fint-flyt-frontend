import React, {useEffect, useState} from 'react';
import { ThemeProvider} from "@mui/material";
import Main from "./features/main/Main";
import {BrowserRouter} from "react-router-dom";
import IntegrationProvider from "./context/IntegrationContext";
import SourceApplicationProvider from "./context/SourceApplicationContext";
import axios from "axios";
import {nbNO} from '@mui/material/locale';
import HistoryProvider from './context/HistoryContext';
import mainTheme from './util/styles/mainTheme';



function App() {
    const [basePath, setBasePath] = useState<string>();

    useEffect(() => {
        axios.get('api/application/configuration')
            .then(value => {
                axios.defaults.baseURL = value.data.basePath;
                setBasePath(value.data.basePath);
            })
            .catch(reason => {
                console.log(reason);
                setBasePath('/');
            })
    }, [basePath]);

    return basePath ?
        (
            <ThemeProvider theme={mainTheme}>
                <HistoryProvider>
                    <SourceApplicationProvider>
                        <IntegrationProvider>
                            <BrowserRouter basename={basePath}>
                                <Main/>
                            </BrowserRouter>
                        </IntegrationProvider>
                    </SourceApplicationProvider>
                </HistoryProvider>
            </ThemeProvider>
        )
        : <h1>Loading</h1>

}

export default App;
