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
            backgroundColor: 'white',
            width: '100%'
        },
        dataPanelBox: {
            height: '600px',
            width: '100%',
            backgroundColor: 'white',
            marginRight: '8px'
        }
    })
);

const IntegrationOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const {existingIntegration, setNewIntegration, getNewIntegrations, resetIntegrations} = useContext(IntegrationContext)
    const {sourceApplication, getAllMetadata} = useContext(SourceApplicationContext)
    const showPanel: boolean = /panel$/.test(window.location.pathname)
    const showList: boolean = /list$/.test(window.location.pathname)


    useEffect(()=> {
        if (showList) resetIntegrations();
        getNewIntegrations(sourceApplication.toString());
        getAllMetadata(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetConfiguration = () => {
        setNewIntegration({})
        getNewIntegrations(sourceApplication.toString());
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

export default withRouter(IntegrationOverview);
