import { useCommonStyles } from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const DashboardStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),

        dataGridContainer: {
            marginTop: theme.spacing(4)
        }
    }));
