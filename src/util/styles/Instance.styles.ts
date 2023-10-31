import { useCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const InstanceStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
        dataPanelBox: {
            height: theme.spacing(75),
            width: '100%',
            backgroundColor: 'white',
            marginRight: theme.spacing(1)
        }
    })
);