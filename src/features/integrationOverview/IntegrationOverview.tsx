import {Breadcrumbs, Theme, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {IRow} from "./types/Row";
import IntegrationConfigurationDetails from "./components/IntegrationConfigurationDetails";
import IntegrationConfigurationTable from "./components/IntegrationConfigurationTable";
import {IntegrationContext} from "../../context/integrationContext";
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "750px",
            width: '100%'
        }
    })
);

const IntegrationOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const showDetails: boolean = window.location.pathname === '/integration/configuration/details'
    const [configurations, getConfigurations] = useState<IRow[]>([]);
    const {integration, setIntegration} = useContext(IntegrationContext)
    const [initialVersion, setInitialVersion] = useState(integration.version);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        getAllConfigurations();
    }, [])

    const getAllConfigurations = () => {
        IntegrationRepository.get()
            .then((response) => {
                if(response.data.content) {
                    const allConfigurations = response.data.content;
                    getConfigurations(allConfigurations);
                }
                setLoading(false);
            })
            .catch(e => console.error('Error: ', e))
    }

    const resetConfiguration = () => {
        setIntegration({})
        getAllConfigurations();
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography style={{cursor:'pointer'}} onClick={resetConfiguration}>{t('header')}</Typography>
                <Typography>{integration.sourceApplicationIntegrationId && showDetails ? t('details') : ''}</Typography>
            </Breadcrumbs>
            {integration.sourceApplicationIntegrationId && showDetails ?
                <IntegrationConfigurationDetails
                    reset={resetConfiguration}
                    initialConfiguration={integration}
                    initialVersion={initialVersion}
                /> :
                <IntegrationConfigurationTable
                    classes={classes}
                    loading={loading}
                    configurations={configurations}
                    setIntegration={setIntegration}
                    setInitialVersion={setInitialVersion}
                />
            }
        </>
    );
}

export default withRouter(IntegrationOverview);
