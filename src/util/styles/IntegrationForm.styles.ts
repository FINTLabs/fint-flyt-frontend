import { useCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const fontFamily: string = ["Nunito Sans", 'sans-serif'].join(',')

export const IntegrationFormStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
        formControl: {
            width: theme.spacing(70)
        },
        panelContainer: {
            backgroundColor: 'white',
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'lightgray',
            marginLeft: theme.spacing(1),
            borderRadius: theme.spacing(0.5),
            height: 'fit-content',
            width: theme.spacing(70)
        },

        incomingWrapper: {},
        outgoingWrapper: {
            marginTop: theme.spacing(2)
        }
    })
);