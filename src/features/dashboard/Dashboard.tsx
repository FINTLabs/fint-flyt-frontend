import {Box, Card, CardContent, Theme} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {IRow} from "../overview/types/Row";
import {IntegrationContext} from "../../integrationContext";
import IntegrationConfigurationTable from "../overview/components/IntegrationConfigurationTable";
import IntegrationConfigurationDetails from "../overview/components/IntegrationConfigurationDetails";
import DashboardCard from "./DashboardCard";
import {ICard} from "../integration/types/Field";

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
    const classes = useStyles();
    const [numberOfIntegrations, setNumberOfIntegrations] = useState();
    const showDetails: boolean = window.location.pathname === '/overview/details'
    const [configurations, getConfigurations] = useState<IRow[]>([]);
    const {integration, setIntegration} = useContext(IntegrationContext)
    const [initialVersion, setInitialVersion] = useState(integration.version);

    useEffect(()=> {
        getAllConfigurations();
    }, [])

    const getAllConfigurations = () => {
        IntegrationRepository.get()
            .then((response) => {
                const allConfigurations = response.data.content;
                setNumberOfIntegrations(response.data.numberOfElements);
                getConfigurations(allConfigurations)
            })
            .catch(e => console.error('Error: ', e))
    }

    const resetConfiguration = () => {
        setIntegration({})
        getAllConfigurations();
    }

    const cards: ICard[] = [
        { value: numberOfIntegrations == 0 ? 'Ingen' : numberOfIntegrations, content: 'skjema', links: [
                {name: 'Ny integrasjon', href: '/integration/configuration/new'}
            ]
        },
        { value: 'Ingen', content: 'feilmeldinger', links: [
                {name: 'Se logg', href: '/log'}
            ]
        },
        { value: 53, content: 'innsendte siste døgn', links: [
                {name: 'Se logg', href: '/log'}
            ]
        },
        { value: '99%', content: 'suksessrate'}
    ]

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                {cards.map(card => {
                    return (
                        <DashboardCard
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