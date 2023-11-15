import { useCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const IntegrationStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
        dataPanelBox: {
            height: theme.spacing(55),
            width: '100%',
            marginBottom: theme.spacing(3),
            "&:last-child": {
                marginLeft: theme.spacing(2)
            }
        },
        tableWrapper: {
            maxWidth: theme.spacing(220),
            border: '1px solid lightgrey',
            borderRadius: theme.spacing(0.5),
        },
        integrationWrapper: {
            height: theme.spacing(22),
            minWidth: theme.spacing(80),
            width: 'fit-content',
            border: '1px solid lightgrey',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            backgroundColor: 'white'
        }
    })
);
