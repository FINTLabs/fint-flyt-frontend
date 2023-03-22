import {Breadcrumbs, Theme, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationTable from "./components/IntegrationTable";
import {IntegrationContext} from "../../context/integrationContext";
import {useTranslation} from 'react-i18next';
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
            height: theme.spacing(112),
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            width: '100%'
        },
        dataPanelBox: {
            height: theme.spacing(75),
            width: '100%',
            backgroundColor: 'white',
            marginRight: theme.spacing(1)
        },
        tableWrapper: {
            maxWidth: theme.spacing(220),
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            backgroundColor: 'white'
        },
        integrationWrapper: {
            height: theme.spacing(22),
            minWidth: theme.spacing(80),
            width: 'fit-content',
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            backgroundColor: 'white'
        }
    })
);

const IntegrationOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = useStyles();
    const {
        existingIntegration,
        setIntegration,
        getIntegrations,
        resetIntegrations
    } = useContext(IntegrationContext)
    const {sourceApplication, getAllMetadata} = useContext(SourceApplicationContext)
    const showPanel: boolean = /panel$/.test(window.location.pathname)
    const showList: boolean = /list$/.test(window.location.pathname)


    useEffect(() => {
        if (showList) resetIntegrations();
        getIntegrations(sourceApplication.toString());
        getAllMetadata(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resetConfiguration = () => {
        setIntegration({})
        getIntegrations(sourceApplication.toString());
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
