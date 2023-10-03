import React, {useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import Main from "./features/main/Main";
import {BrowserRouter} from "react-router-dom";
import IntegrationProvider from "./context/integrationContext";
import SourceApplicationProvider from "./context/sourceApplicationContext";
import axios from "axios";
import {nbNO} from '@mui/material/locale';
import HistoryProvider from './context/historyContext/HistoryContext';


const theme = createTheme(
    {
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
            background: {
                default: '#EBF4F5',
            }
        },
        spacing: 8,
        typography: {
            fontFamily: [
                "Nunito Sans", 'sans-serif'
            ].join(','),
            button: {
                textTransform: 'none',
                font: "Nunito Sans",
                fontSize: 16
            }
        }
    },
    nbNO
);

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
            <ThemeProvider theme={theme}>
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
