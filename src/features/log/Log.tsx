import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";
import { useTranslation } from 'react-i18next';

const Log: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.log'});
    return (
        <>
            <Typography>{t('header')}</Typography>
        </>
    );
}

export default withRouter(Log);