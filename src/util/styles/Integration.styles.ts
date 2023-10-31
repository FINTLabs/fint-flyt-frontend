import { useCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const IntegrationStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
        dataPanelBox: {
            height: theme.spacing(45),
            width: '100%',
            backgroundColor: 'white',
            marginBottom: theme.spacing(3)
        },
        tableWrapper: {
            maxWidth: theme.spacing(220),
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            backgroundColor: 'white'
        },
        integrationWrapper: {
            height: theme.spacing(22),
            minWidth: theme.spacing(80),
            width: 'fit-content',
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            backgroundColor: 'white'
        }
    })
);
