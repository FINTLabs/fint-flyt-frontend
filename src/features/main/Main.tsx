import React, {useContext} from "react";
import {
    AppBar, Badge,
    Box, Button,
    Drawer,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

import {createStyles, makeStyles} from "@mui/styles";
import Router from "./Router";
import MenuItems from "./MenuItems";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {IntegrationContext} from "../../context/integrationContext";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'}
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
    const {t, i18n} = useTranslation();
    // eslint-disable-next-line
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    //TODO 15/12: set admin access based on log in
    // eslint-disable-next-line
    const { isAdmin, setIsAdmin } = useContext(SourceApplicationContext)
    const {statistics} = useContext(IntegrationContext)
    let totalErrors = 0;
    statistics?.map((stat: any) => {
        return totalErrors += stat.currentErrors
    })


    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar className={classes.toolbar} id={"toolbar"}>
                    <img src="https://cdn.flais.io/media/fint-by-vigo-white.svg" alt="logo" className={classes.logo}/>
                    <Typography variant="h6" color="inherit" noWrap className={classes.flex}>
                        {t('appbarHeader')}
                    </Typography>
                    {/*<Box sx={{ mr: 2 }}>
                        {i18n.language === 'no' && <Button size="small" variant="contained" onClick={() => changeLanguage("en")}>{t('language.english')}</Button>}
                        {i18n.language === 'en' && <Button size="small" variant="contained" onClick={() => changeLanguage("no")}>{t('language.norwegian')}</Button>}
                    </Box>*/}
                    {isAdmin && <Box sx={{ mr: 2}}>
                        <Button size="medium" variant="contained" component={RouterLink} to="/admin" endIcon={<AdminPanelSettingsIcon />}
                        >
                            {t('adminHeader')}
                        </Button>
                    </Box>}
                    <Badge className={classes.badge}
                           badgeContent={totalErrors}
                           color="secondary"
                           component={RouterLink} to="/integration/instance/list">
                        <NotificationsIcon htmlColor={"white"}/>
                    </Badge>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer}>
                <Toolbar/>
                <MenuItems/>
            </Drawer>
            <main className={classes.content}>
                <Router/>
            </main>
        </Box>
    );
}

export default Main;

