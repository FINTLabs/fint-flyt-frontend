import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const DashboardStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 1px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        },
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridContainer: {
            marginTop: theme.spacing(4)
        },
        dataGridBox: {
            minHeight: theme.spacing(70),
            maxHeight: theme.spacing(300),
            width: '100%'
        }
    }));
