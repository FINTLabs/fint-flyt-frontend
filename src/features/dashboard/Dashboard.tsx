import {Box, Card} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {IntegrationContext} from "../../context/IntegrationContext";
import IntegrationTable from "../integrationOverview/components/IntegrationTable";
import DashboardCard from "./DashboardCard";
import {ICard} from "./types/Card";
import {useTranslation} from "react-i18next";
import {DashboardStyles} from "../../util/styles/Dashboard.styles";
import {IIntegrationStatistics} from "./types/IntegrationStatistics";
import PageTemplate from "../../components/templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";

const useStyles = DashboardStyles;

const Dashboard: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.dashboard'});
    const classes = useStyles();
    const {statistics, resetIntegrations, integrations, getAllIntegrations} = useContext(IntegrationContext)
    const activeIntegrations = integrations?.filter(integration => integration.state === 'ACTIVE') || [];
    let totalErrors = 0;
    let totalDispatched = 0;
    const totalActive = activeIntegrations.length;
    statistics?.map((stat: IIntegrationStatistics) => {
        totalErrors += stat.currentErrors;
        totalDispatched += stat.dispatchedInstances;
    })

    useEffect(() => {
        getAllIntegrations();
        resetIntegrations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cards: ICard[] = [
        {
            value: integrations === undefined || integrations.length === 0 ? t('empty') : integrations.length.toString(),
            content: integrations !== undefined && integrations.length === 1 ? t('oneIntegration') : t('integrations'),
            links: [
                {name: t('links.integration'), href: '/integration/new'}
            ]
        },
        {
            value: totalActive === 0 ? t('empty') : totalActive.toString(),
            content: totalActive === 1 ? t('oneActiveIntegration') : t('activeIntegrations'),
            links: [
                {name: t('links.integrationOverview'), href: '/integration/list'}
            ]
        },
        {
            value: totalDispatched === 0 ? t('empty') : totalDispatched.toString(),
            content: totalDispatched === 1 ? t('oneInstance') : t('instances'),
            links: [
                {name: t('links.instances'), href: '/integration/instance/list'}
            ]
        },
        {
            value: totalErrors === 0 ? t('empty') : totalErrors.toString(),
            content: totalErrors === 1 ? t('oneError') : t('errors'),
            links: [
                {name: t('links.instances'), href: '/integration/instance/list'}
            ]
        }
    ]

    return (
        <PageTemplate id={'dashboard'} keyPrefix={'pages.dashboard'} customHeading>
            <Box id={'dashboard-card-container'} display="flex" position="relative" width={1} height={1}>
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
            <Card sx={{mt: 4, boxShadow: 'none'}}>
                <IntegrationTable
                    classes={classes}
                />
            </Card>
        </PageTemplate>
    );
}

export default Dashboard;