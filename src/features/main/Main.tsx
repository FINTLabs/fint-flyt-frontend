import React, {useContext, useEffect} from "react";
import {AppBar, Box,  Drawer, Toolbar, Typography} from "@mui/material";
import Router from "./Router";
import MenuItems from "./MenuItems";

import {useTranslation} from "react-i18next";

import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import ConfigurationProvider from "../../context/ConfigurationContext";
import {MainStyles} from "../../util/styles/Main.styles";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {IIntegration} from "../integration/types/Integration";

const useStyles = MainStyles;

function Main() {
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const { sourceApplication, setSourceApplication} = useContext(SourceApplicationContext)


    useEffect(() => {
        (async () => {
            await IntegrationRepository.getAllIntegrations()
                .then(response => {
                    const data: IIntegration[] = response.data
                    if(data.length > 0) {
                        setSourceApplication(Number(data[0].sourceApplicationId))
                    }
                    else {
                        setSourceApplication(1)
                    }
                })
                .catch(e => {
                    setSourceApplication(1)
                    console.log(e)
                })
        })();
    }, []);

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
            {sourceApplication ?
                <main className={classes.content}>
                    <ConfigurationProvider>
                        <Router/>
                    </ConfigurationProvider>
                </main>
                : <><Typography>Loading</Typography></>
            }
        </Box>
    );
}

export default Main;