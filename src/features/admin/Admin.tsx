import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Button, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import {RouteComponent} from "../main/Route";

const Admin: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.admin'});
    const {isAdmin} = useContext(SourceApplicationContext)


    if (!isAdmin) {
        return (
            <>
                <Typography>{t('noAccessMessage')}</Typography>
                <Button sx={{mt: 2}} size="medium" variant="contained" component={RouterLink} to="/">
                    {t('button.back')}
                </Button>
            </>
        )
    }

    return (
        <>
            <Typography>{t('header')}</Typography>
        </>
    );
}

export default Admin;