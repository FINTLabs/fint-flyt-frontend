import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const fontFamily: string = ["Nunito Sans", 'sans-serif'].join(',')

export const IntegrationFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: theme.spacing(70)
        },
        panelContainer: {
            backgroundColor: 'white',
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            marginLeft: theme.spacing(1),
            borderRadius: theme.spacing(0.5),
            height: 'fit-content',
            width: theme.spacing(70)
        },
     
        title1: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(3),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        title2: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2.6),
            padding: 0,
            marginTop: theme.spacing(0),
            fontWeight: 'normal'
        },
        title3: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: theme.spacing(2.2),
            padding: 0,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(2),
            fontWeight: 'normal'
        },
        incomingWrapper: {},
        outgoingWrapper: {
            marginTop: theme.spacing(2)
        }
    })
);