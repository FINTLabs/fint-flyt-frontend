import React, {useContext, useEffect, useState} from "react";
import {AppBar, Box, Button, Drawer, Toolbar, Typography} from "@mui/material";
import Router from "./Router";
import MenuItems from "./MenuItems";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import ConfigurationProvider from "../../context/configurationContext";
import {MainStyles} from "../../util/styles/Main.styles";
import {useIdleTimer} from "react-idle-timer";

const useStyles = MainStyles;

function Main() {
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const {isAdmin, timeOut, setTimeOut} = useContext(SourceApplicationContext) // eslint-disable-line
    const [idleState, setIdleState] = useState<string>('Active') // eslint-disable-line
    const [remaining, setRemaining] = useState<number>(0) // eslint-disable-line
    const [count, setCount] = useState<number>(0)
    const [idleTime, setIdleTime] = useState<number>(0)

    // eslint-disable-next-line
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const onIdle = () => {
        setIdleState('Idle')
    }

    const onActive = () => {
        setIdleState('Active')
        setIdleTime(0)
    }

    const onAction = () => {
        setCount(count + 1)
    }

    const {getRemainingTime, isIdle} = useIdleTimer({ // eslint-disable-line
        onIdle,
        onActive,
        onAction,
        promptBeforeIdle: 9_000,
        timeout: 10_000,
        throttle: 500
    })

    useEffect(() => {
        if (isIdle()) {
            const interval = setInterval(() => {
                setIdleTime(idleTime + 1000)
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    })

    if (idleTime > 30000) {
        setTimeOut(true)
    }

    // eslint-disable-next-line
    function onCloseAction() {
        setTimeOut(false)
    }

    // console.log('idle i ', idleTime/1000, 'sekund. timeOut: ', timeOut, idleState)

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
                    {isAdmin && <Box sx={{mr: 2}}>
                        <Button size="medium" variant="contained" component={RouterLink} to="/admin"
                                endIcon={<AdminPanelSettingsIcon/>}
                        >
                            {t('adminHeader')}
                        </Button>
                    </Box>}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer}>
                <Toolbar/>
                <MenuItems/>
            </Drawer>
            <main className={classes.content}>
                {/*<Dialog open={timeOut}>
                    <DialogTitle>Advarsel</DialogTitle>
                    <DialogContent>
                        Du blir logget ut om ... sekunder
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseAction}>Disagree</Button>
                        <Button onClick={onCloseAction} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>*/}
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
        </Box>
    );
}

export default Main;

