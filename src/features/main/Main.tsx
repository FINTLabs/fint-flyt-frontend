import React, {ReactNode} from "react";
import {
    AppBar, Badge,
    Box,
    Drawer, IconButton, MenuItem,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import FintLogo from "../../images/fint-by-vigo-white.svg";
import {createStyles, makeStyles, useTheme} from "@mui/styles";
import Router from "./Router";
import MenuItems from "./MenuItems";
import {red} from "@mui/material/colors";
import {log} from "util";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar
        },
        content: {
            width: "100%",
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: 24,
            minHeight: "100vh",
            marginTop: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                height: "calc(100% - 64px)",
                marginTop: theme.spacing(8)
            }
        },
        logo: {
            width: 86,
            marginRight: theme.spacing(4),
            marginBottom: theme.spacing()
        },
        flex: {
            flex: 1
        },
        badge: {
            cursor: 'pointer',
        }
    }));


function Main() {
    const classes = useStyles();
    const numberOfNotifications: number = 4;

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className={classes.toolbar} id={"toolbar"}>
                    <img src={FintLogo} alt="logo" className={classes.logo}/>
                    <Typography variant="h6" color="inherit" noWrap className={classes.flex}>
                        Skjema til arkivintegrasjon
                    </Typography>
                    <Badge className={classes.badge}
                           badgeContent={numberOfNotifications}
                           color="secondary"
                           onClick={(e)=> console.log('notifications', numberOfNotifications)}>
                        <NotificationsIcon/>
                    </Badge>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer}>
                <Toolbar />
                <MenuItems/>
            </Drawer>
            <main className={classes.content}>
                <Router/>
            </main>
        </Box>
    );
}

export default Main;

