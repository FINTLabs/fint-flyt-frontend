import {createTheme} from "@mui/material";
import {nbNO} from '@mui/material/locale';

const theme = createTheme(
    {
        palette: {
            secondary: {
                light: '#7fb434',
                main: '#5FA202',
                dark: '#427101',
            },
            primary: {
                light: '#5A51E1',
                main: '#5A51E1',
                dark: '#5A51E1',
            },
            background: {
                default: '#EBF4F5',
            }
        },
        spacing: 8,
        typography: {
            fontFamily: [
                "Roboto", 'sans-serif'
            ].join(','),
            button: {
                textTransform: 'none',
                font: "Roboto",
                fontSize: 16
            }
        }
    },
    nbNO
);

export default theme;