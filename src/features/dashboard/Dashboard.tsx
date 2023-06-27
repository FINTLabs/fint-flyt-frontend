import {Box, Card, CardContent} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {IntegrationContext} from "../../context/integrationContext";
import IntegrationTable from "../integrationOverview/components/IntegrationTable";
import DashboardCard from "./DashboardCard";
import {ICard} from "./types/Card";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import {DashboardStyles} from "../../util/styles/Dashboard.styles";

const useStyles = DashboardStyles;

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.dashboard'});
    const classes = useStyles();
    const {statistics, resetIntegrations, integrations, getIntegrations} = useContext(IntegrationContext)
    const {sourceApplication} = useContext(SourceApplicationContext)
    let totalErrors = 0;
    statistics?.map((stat: any) => {
        return totalErrors += stat.currentErrors
    })

    useEffect(() => {
        getIntegrations(sourceApplication ? sourceApplication.toString() : "2");
        resetIntegrations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cards: ICard[] = [
        {
            value: integrations === undefined || integrations.length === 0 ? t('empty') : integrations.length,
            content: integrations !== undefined && integrations.length === 1 ? t('oneForm') : t('form'),
            links: [
                {name: t('links.integration'), href: '/integration/new'}
            ]
        },
        {
            value: totalErrors === 0 ? t('empty') : totalErrors.toString(),
            content: totalErrors === 1 ? t('oneError') : t('errors'),
            links: [
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
                    />
                </CardContent>
            </Card>
        </Box>
    );
}

export default withRouter(Dashboard);