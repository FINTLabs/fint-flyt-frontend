import { createCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const InstanceStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...createCommonStyles(theme),
        form: {
            width: theme.spacing(120)
        },
        dataGridBox: {
            minHeight: theme.spacing(80),
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            width: '100%'
        },
        dataPanelBox: {
            height: theme.spacing(75),
            width: '100%',
            backgroundColor: 'white',
            marginRight: theme.spacing(1)
        }
    })
);