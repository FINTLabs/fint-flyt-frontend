import {Breadcrumbs, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import IntegrationTable from "./components/IntegrationTable";
import {IntegrationContext} from "../../context/IntegrationContext";
import {useTranslation} from 'react-i18next';
import IntegrationPanel from "./components/IntegrationPanel";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {IntegrationStyles} from "../../util/styles/Integration.styles";
import {RouteComponent} from "../main/Route";

const useStyles = IntegrationStyles;

const IntegrationOverview: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const {
        existingIntegration,
        setExistingIntegration,
        getAllIntegrations,
        resetIntegrations
    } = useContext(IntegrationContext)
    const {getAllMetadata} = useContext(SourceApplicationContext)
    const showPanel: boolean = /panel$/.test(window.location.pathname)
    const showList: boolean = /list$/.test(window.location.pathname)


    useEffect(() => {
        if (showList) {
            resetIntegrations();
        }
        getAllIntegrations();
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetConfiguration = () => {
        setExistingIntegration({})
        getAllIntegrations()
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography onClick={resetConfiguration}>{t('header')}</Typography>
                <Typography>{existingIntegration?.sourceApplicationIntegrationId ? t('details') : ''}</Typography>
            </Breadcrumbs>
            {existingIntegration?.sourceApplicationIntegrationId && showPanel ?
                <IntegrationPanel
                    classes={classes}
                /> :
                <IntegrationTable
                    classes={classes}
                />
            }
        </>
    );
}

export default IntegrationOverview;
