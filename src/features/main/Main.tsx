import React from "react";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import MenuItems from "./MenuItems";
import {Link as RouterLink} from "react-router-dom";
import {MainStyles} from "../../util/styles/Main.styles";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "./Router";

const useStyles = MainStyles;

function Main() {
    const classes = useStyles();


    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <AppBar className={classes.appBar} sx={{zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none'}}>
                <Toolbar id={"toolbar"}>
                    <Button component={RouterLink} to="/">
                        <img src="https://cdn.flais.io/media/fint-by-vigo-white.svg" alt="logo"
                             className={classes.logo}/>
                    </Button>
                    <nav>
                        <MenuItems/>
                    </nav>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
        </Box>
    );
}

export default Main;