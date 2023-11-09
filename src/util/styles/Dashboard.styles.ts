import {createCommonStyles} from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const DashboardStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...createCommonStyles(theme),
        card: {
            border: 'solid 1px',
            borderColor: 'lightgray',
            marginRight: theme.spacing(2),
        },
        dataGridContainer: {
            marginTop: theme.spacing(4)
        }
    }));
