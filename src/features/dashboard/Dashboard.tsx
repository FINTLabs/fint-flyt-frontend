import {Box, Card, CardContent, Theme} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {IRow} from "../overview/types/Row";
import {IntegrationContext} from "../../context/integrationContext";
import IntegrationConfigurationTable from "../overview/components/IntegrationConfigurationTable";
import IntegrationConfigurationDetails from "../overview/components/IntegrationConfigurationDetails";
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
    const [numberOfIntegrations, setNumberOfIntegrations] = useState(0);
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
                const allConfigurations = response.data.content;
                setNumberOfIntegrations(response.data.numberOfElements);
                getConfigurations(allConfigurations)
                setLoading(false);
            })
            .catch(e => console.error('Error: ', e))
    }

    const resetConfiguration = () => {
        setIntegration({})
        getAllConfigurations();
    }

    const cards: ICard[] = [
        { value: numberOfIntegrations === 0 ? t('empty') : numberOfIntegrations, content: t('form'), links: [
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
                    {integration.integrationId && showDetails ?
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
                        />}
                </CardContent>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);
