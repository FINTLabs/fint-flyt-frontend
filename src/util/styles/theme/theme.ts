import {createTheme, Theme} from "@mui/material";
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


export const createCommonStyles = (theme : Theme) => {
    return {
        dataGridBox: {
            minHeight: theme.spacing(80),
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            width: '100%',
        },
        form: {
            width: theme.spacing(120),
        },
        row: {
            display: 'flex',
        },
        flex: {
            flex: 1
        },
     
    };
};




export default theme;