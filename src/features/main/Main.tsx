import React from "react";
import {AppBar, Box, Drawer, Toolbar, Typography} from "@mui/material";
import Router from "./Router";
import MenuItems from "./MenuItems";
import {useTranslation} from "react-i18next";
import ConfigurationProvider from "../../context/ConfigurationContext";
import {MainStyles} from "../../util/styles/Main.styles";

const useStyles = MainStyles;

function Main() {
    const classes = useStyles();
    const {t, i18n} = useTranslation();

    // eslint-disable-next-line
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };


    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar className={classes.toolbar} id={"toolbar"}>
                    <img src="https://cdn.flais.io/media/fint-by-vigo-white.svg" alt="logo"
                         className={classes.logo}/>
                    <Typography variant="h6" color="inherit" noWrap className={classes.flex}>
                        {t('appbarHeader')}
                    </Typography>
                    {/*<Box sx={{ mr: 2 }}>
                        {i18n.language === 'no' && <Button size="small" variant="contained" onClick={() => changeLanguage("en")}>{t('language.english')}</Button>}
                        {i18n.language === 'en' && <Button size="small" variant="contained" onClick={() => changeLanguage("no")}>{t('language.norwegian')}</Button>}
                    </Box>*/}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer}>
                <Toolbar/>
                <MenuItems/>
            </Drawer>
            <main className={classes.content}>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
        </Box>
    );
}

export default Main;