import {Box, Card, CardContent, Theme} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {IRow} from "../integrationOverview/types/Row";
import {IntegrationContext} from "../../context/integrationContext";
import IntegrationConfigurationTable from "../integrationOverview/components/IntegrationConfigurationTable";
import IntegrationConfigurationDetails from "../integrationOverview/components/IntegrationConfigurationDetails";
import DashboardCard from "./DashboardCard";
import {ICard} from "./types/Card";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            border: 'solid 1px',
            marginRight: theme.spacing(2),
            borderColor: theme.palette.primary.main
        },
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridContainer: {
            marginTop: theme.spacing(4)
        },
        dataGridBox: {
            minHeight: '400px',
            maxHeight: '2500px',
            width: '100%'
        }
    }));

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.dashboard'});
    const classes = useStyles();
    const showDetails: boolean = window.location.pathname === '/integration/configuration/details'
    const {integration, setIntegration, integrations, getIntegrations} = useContext(IntegrationContext)
    const [initialVersion, setInitialVersion] = useState(integration.version);

    useEffect(()=> {
        getIntegrations();
    }, [])


    const resetConfiguration = () => {
        setIntegration({})
        getIntegrations();
    }

    const cards: ICard[] = [
        { value: integrations.length === 0 ? t('empty') : integrations.length, content: t('form'), links: [
                {name: t('links.newIntegration'), href: '/integration/configuration/new'}
            ]
        },
        { value: t('empty'), content: t('errors'), links: [
                {name: t('links.log'), href: '/log'}
            ]
        }
    ]

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                {cards.map((card: ICard, index) => {
                    return (
                        <DashboardCard
                            key={index}
                            id={`dashboard-card-` + index}
                            value={card.value}
                            content={card.content}
                            links={card.links}
                            classes={classes}
                        />)
                })}
            </Box>
            <Card className={classes.card} sx={{mt: 4}}>
                <CardContent>
                    {integration.sourceApplicationIntegrationId && showDetails ?
                        <IntegrationConfigurationDetails
                            reset={resetConfiguration}
                            initialConfiguration={integration}
                            initialVersion={initialVersion}
                        /> :
                        <IntegrationConfigurationTable
                            classes={classes}
                            loading={integrations.length === 0}
                            configurations={integrations}
                            setIntegration={setIntegration}
                            setInitialVersion={setInitialVersion}
                        />}
                </CardContent>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);
