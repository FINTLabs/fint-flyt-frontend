import React from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import Main from "./main/Main";
import {BrowserRouter} from "react-router-dom";

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
    typography: {
         fontFamily: [
             "Nunito Sans", 'sans-serif'
         ].join(',')
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;


