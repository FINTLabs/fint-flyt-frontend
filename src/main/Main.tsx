import React from "react";
import {
    AppBar,
    Box,
    Drawer,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";

import FintLogo from "../images/fint-by-vigo-white.svg";
import {createStyles, makeStyles} from "@mui/styles";
import Router from "../config/router";
import MenuItems from "./MenuItems";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 5,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36
        },
        hide: {
            display: "none"
        },
        drawerPaper: {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerPaperClose: {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9)
            }
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
            marginTop: 56,
            [theme.breakpoints.up("sm")]: {
                height: "calc(100% - 64px)",
                marginTop: 64
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
        flexName: {
            flex: 1,
            textAlign: "end",
            marginBottom: "2px"
        },
    }));

function Main() {
    const classes = useStyles();

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar id={"toolbar"}>
                    <img src={FintLogo} alt="logo" className={classes.logo}/>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.flex}
                    >
                        Skjema til arkivintegrasjon
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
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

