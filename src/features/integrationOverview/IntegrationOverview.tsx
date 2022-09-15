import {Breadcrumbs, Theme, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationConfigurationDetails from "./components/IntegrationConfigurationDetails";
import IntegrationConfigurationTable from "./components/IntegrationConfigurationTable";
import {IntegrationContext} from "../../context/integrationContext";
import { useTranslation } from 'react-i18next';
import EventRepository from "../log/repository/EventRepository";
import IntegrationPanel from "./components/IntegrationPanel";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "900px",
            width: '100%'
        },
        dataPanelBox: {
            height: "500px",
            width: '100%'
        }
    })
);

const IntegrationOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const showPanel: boolean = window.location.pathname === '/integration'
    const {newIntegration, setNewIntegration, newIntegrations, getNewIntegrations, configurations, getConfigurations} = useContext(IntegrationContext)
    type statistics = {
        currentErrors: string,
        dispatchedInstances: string
    }
    let integrationStats: Map<string, statistics>;
    const showDetails: boolean = window.location.pathname === '/integration/configuration/details'
        const {integration, setIntegration, integrations, getIntegrations} = useContext(IntegrationContext)
    const [initialVersion, setInitialVersion] = useState(integration.version);


    useEffect(()=> {
        getIntegrations();
        getNewIntegrations();
    }, []);

    const resetConfiguration = () => {
        setNewIntegration({integrationId: ''})
        getNewIntegrations();
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography style={{cursor:'pointer'}} onClick={resetConfiguration}>{t('header')}</Typography>
                <Typography>{newIntegration?.sourceApplicationIntegrationId && showPanel ? t('details') : ''}</Typography>
            </Breadcrumbs>
            {newIntegration?.sourceApplicationIntegrationId && showPanel ?
                <IntegrationPanel
                    classes={classes}
                    loading={configurations.length === 0}
                    initialConfiguration={newIntegration}
                    configurations={configurations}
                /> :
                <IntegrationConfigurationTable
                    classes={classes}
                    loading={newIntegrations.length === 0}
                    integrations={newIntegrations}
                    getConfigurations={getConfigurations}
                    setIntegration={setNewIntegration}
                />
            }
        </>
    );
}

export default withRouter(IntegrationOverview);
