import React, {useContext} from "react";
import {
    AppBar, Badge,
    Box,
    Drawer,
    Theme,
    Toolbar,
    Typography,
    Button
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ErrorIcon from '@mui/icons-material/Error';
import ReplayIcon from '@mui/icons-material/Replay';
import FintLogo from "../../images/fint-by-vigo-white.svg";

import { createStyles, makeStyles } from "@mui/styles";
import Router from "./Router";
import MenuItems from "./MenuItems";
import {Link as RouterLink, useHistory} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {AppContext} from "../../context/appContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios from "axios";
import IntegrationRepository from "../integration/repository/IntegrationRepository";


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



function Main() {
    const classes = useStyles();

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const nav = useHistory();

    const {connectionError, setConnectionError} = useContext(AppContext)

    const setError = async (f: any) => {
        setConnectionError(true);
        reload();
    };

    const reload = () => {
        nav.push('/oauth2/sign_out')
    }

    createAuthRefreshInterceptor(axios, setError, {
        statusCodes: [ 401, 403 ]
    });

    const getAuthToken = () => {
        IntegrationRepository.getAuthToken()
            .then(response => {
                console.log(response)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar className={classes.toolbar} id={"toolbar"}>
                    <img src={FintLogo} alt="logo" className={classes.logo} />
                    <Button variant='contained' onClick={getAuthToken}>Get authToken</Button>

                    <Typography variant="h6" color="inherit" noWrap className={classes.flex}>
                        {t('appbarHeader')}
                    </Typography>
                    {/*<Box sx={{ mr: 2 }}>
                        {i18n.language === 'no' && <Button size="small" variant="contained" onClick={() => changeLanguage("en")}>{t('language.english')}</Button>}
                        {i18n.language === 'en' && <Button size="small" variant="contained" onClick={() => changeLanguage("no")}>{t('language.norwegian')}</Button>}
                    </Box>*/}

                    {connectionError && <>
                        <Button><ErrorIcon htmlColor={"white"}/></Button>
                        <Typography>{t('errors.connection')}</Typography>
                        <Button onClick={reload}>
                            <ReplayIcon htmlColor={"white"} />
                        </Button>
                    </>}
                    {/*<Badge className={classes.badge}
                        badgeContent={"5"}
                        color="secondary"
                        component={RouterLink} to="/log">
                        <NotificationsIcon htmlColor={"white"} />
                    </Badge>*/}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer}>
                <Toolbar />
                <MenuItems />
            </Drawer>
            <main className={classes.content}>
                <Router />
            </main>
        </Box>
    );
}

export default Main;

