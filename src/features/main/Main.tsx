import React from "react";
import {AppBar, Box, Button, Toolbar} from "@mui/material";
import MenuItems from "./MenuItems";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
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
            <AppBar className={classes.appBar} sx={{zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none'}}>
                <Toolbar id={"toolbar"}>
                    <Button component={RouterLink} to="/">
                        <img src="https://cdn.flais.io/media/fint-by-vigo-white.svg" alt="logo"
                             className={classes.logo}/>
                    </Button>
                    <nav>
                        <MenuItems/>
                    </nav>
                    {/*<Box sx={{ mr: 2 }}>
                        {i18n.language === 'no' && <Button size="small" variant="contained" onClick={() => changeLanguage("en")}>{t('language.english')}</Button>}
                        {i18n.language === 'en' && <Button size="small" variant="contained" onClick={() => changeLanguage("no")}>{t('language.norwegian')}</Button>}
                    </Box>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Main;