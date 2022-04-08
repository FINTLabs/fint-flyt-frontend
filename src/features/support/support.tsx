import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";
import { useTranslation } from 'react-i18next';

const Support: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.support'});
    return (
        <>
            <Typography>{t('header')}</Typography>
        </>
    );
}

export default withRouter(Support);