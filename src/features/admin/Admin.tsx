import React, {useContext} from 'react';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {Typography} from "@mui/material";
import { useTranslation } from 'react-i18next';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";

const Admin: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.admin'});
    const { isAdmin } = useContext(SourceApplicationContext)


    if (!isAdmin) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Typography>{t('header')}</Typography>
        </>
    );
}

export default withRouter(Admin);