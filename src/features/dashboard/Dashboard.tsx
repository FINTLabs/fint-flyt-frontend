import {Box, Card, CardContent, Theme} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import {IntegrationContext} from "../../context/integrationContext";
import IntegrationTable from "../integrationOverview/components/IntegrationTable";
import DashboardCard from "./DashboardCard";
import {ICard} from "./types/Card";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../context/sourceApplicationContext";

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
    const {setExistingIntegration, statistics, resetIntegrations, newIntegrations, getNewIntegrations, getCompletedConfigurations, getConfigurations} = useContext(IntegrationContext)
    const {sourceApplication} = useContext(SourceApplicationContext)
    let totalErrors = 0;
    statistics?.map((stat: any) => {totalErrors += stat.currentErrors})

    useEffect(()=> {
        getNewIntegrations(sourceApplication.toString());
        resetIntegrations();
    }, [])

    const cards: ICard[] = [
        { value: newIntegrations === undefined || newIntegrations.length === 0 ? t('empty') : newIntegrations.length, content: newIntegrations !== undefined && newIntegrations.length == 1 ? t('oneForm') : t('form'), links: [
                {name: t('links.newIntegration'), href: '/integration/configuration/new'}
            ]
        },
        { value: totalErrors === 0 ? t('empty') : totalErrors.toString(), content: totalErrors == 1 ? t('oneError') : t('errors'), links: [
                {name: t('links.instanceOverview'), href: '/integration/instance/list'}
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
                        <IntegrationTable
                            classes={classes}
                            loading={newIntegrations === undefined}
                            integrations={newIntegrations}
                            getConfigurations={getConfigurations}
                            getCompletedConfigurations={getCompletedConfigurations}
                            setExistingIntegration={setExistingIntegration}
                        />
                </CardContent>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);
