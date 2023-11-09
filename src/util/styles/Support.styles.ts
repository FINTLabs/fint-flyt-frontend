import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

export const SupportStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 1px',
            marginRight: theme.spacing(2),
            borderColor: 'lightgray'
        }
    }));