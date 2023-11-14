import {useCommonStyles} from './theme/theme';
import {createStyles, makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";

const drawerWidth = 240;

export const MainStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...useCommonStyles(theme),
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            position: 'fixed',
        },
        drawer: {
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'}
        },
        content: {
            width: "fit-content",
            height: "calc(100vh/1.3)",
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(4),
            [theme.breakpoints.up("sm")]: {
                marginTop: theme.spacing(10),
                minHeight: 'calc(100vh/1.1)',
                height: 'fit-content'
            }
        },
        logo: {
            width: 86,
            marginRight: theme.spacing(4),
            marginBottom: theme.spacing()
        },
        badge: {
            cursor: 'pointer',
        },
        button: {
            display: "block",
            marginTop: theme.spacing(2)
        },
        formControl: {
            margin: theme.spacing(5),
            minWidth: 120,
            backgroundColor: "transparent"
        },
        select: {
            textAlign: "center",
            textDecoration: "none"
        }
    }));

