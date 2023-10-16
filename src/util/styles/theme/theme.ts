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
        panelContainer: {
            backgroundColor: 'white',
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            marginLeft: theme.spacing(1),
            borderRadius: theme.spacing(0.5),
            height: 'fit-content',
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
        title2: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2.6),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        title4: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2),
            padding: 0,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(2),
            fontWeight: 'normal'
        },
        submitButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.spacing(0.5),
            color: 'white',
            cursor: 'pointer',
            padding: theme.spacing(1),
            fontSize: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginRight: theme.spacing(2),
            width: 'fit-content',
            height: 'fit-content',
            "&:disabled": {
                cursor: 'auto',
                backgroundColor: 'lightgray',
                color: 'gray'
            },
            "&:last-child": {
                marginLeft: theme.spacing(2)
            }
        },
     
    };
};




export default theme;