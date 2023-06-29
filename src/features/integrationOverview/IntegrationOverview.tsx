import {Breadcrumbs, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import IntegrationTable from "./components/IntegrationTable";
import {IntegrationContext} from "../../context/integrationContext";
import {useTranslation} from 'react-i18next';
import IntegrationPanel from "./components/IntegrationPanel";
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import {IntegrationStyles} from "../../util/styles/Integration.styles";
import {RouteComponentProps} from "react-router-dom";

const useStyles = IntegrationStyles;

type Props = {
    id: string
}

const IntegrationOverview: React.FunctionComponent<RouteComponentProps<Props>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const {
        existingIntegration,
        setExistingIntegration,
        getIntegrations,
        resetIntegrations
    } = useContext(IntegrationContext)
    const {sourceApplication, getAllMetadata} = useContext(SourceApplicationContext)
    const showPanel: boolean = /panel$/.test(window.location.pathname)
    const showList: boolean = /list$/.test(window.location.pathname)


    useEffect(() => {
        if (showList) {
            resetIntegrations();
        }
        getIntegrations(sourceApplication ? sourceApplication.toString() : "2");
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetConfiguration = () => {
        setExistingIntegration({})
        getIntegrations(sourceApplication ? sourceApplication.toString() : "2");
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
