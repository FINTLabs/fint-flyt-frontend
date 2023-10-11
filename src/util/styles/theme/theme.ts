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

export default theme;