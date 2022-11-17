import {Breadcrumbs, Theme, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationTable from "./components/IntegrationTable";
import {IntegrationContext} from "../../context/integrationContext";
import { useTranslation } from 'react-i18next';
import IntegrationPanel from "./components/IntegrationPanel";
import {SourceApplicationContext} from "../../context/sourceApplicationContext";


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
            height: '600px',
            width: '100%',
            marginRight: '8px'
        }
    })
);

const IntegrationOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const showPanel: boolean = window.location.pathname === '/integration'
    const {existingIntegration, setNewIntegration, setExistingIntegration, newIntegrations, getNewIntegrations, configurations, completedConfigurations, getCompletedConfigurations, getConfigurations} = useContext(IntegrationContext)
    const {getAllMetadata} = useContext(SourceApplicationContext)

    useEffect(()=> {
        getNewIntegrations();
        getAllMetadata(true);
    }, []);

    const resetConfiguration = () => {
        setNewIntegration({})
        getNewIntegrations();
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography onClick={resetConfiguration}>{t('header')}</Typography>
                <Typography>{existingIntegration?.sourceApplicationIntegrationId && showPanel ? t('details') : ''}</Typography>
            </Breadcrumbs>
            {existingIntegration?.sourceApplicationIntegrationId && showPanel ?
                <IntegrationPanel
                    classes={classes}
                    loading={configurations === undefined}
                    initialConfiguration={existingIntegration}
                    configurations={configurations}
                    completedConfigurations={completedConfigurations}
                /> :
                <IntegrationTable
                    classes={classes}
                    loading={newIntegrations === undefined}
                    integrations={newIntegrations}
                    getConfigurations={getConfigurations}
                    getCompletedConfigurations={getCompletedConfigurations}
                    setExistingIntegration={setExistingIntegration}
                />
            }
        </>
    );
}

export default withRouter(IntegrationOverview);
