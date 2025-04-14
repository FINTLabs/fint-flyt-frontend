import React, { useContext, useEffect } from 'react';
import { IntegrationContext } from '../../context/IntegrationContext';
import DashboardCard from '../organisms/DashboardCard';
import { ICard } from '../../features/dashboard/Card';
import { useTranslation } from 'react-i18next';
import { IIntegrationStatistics } from '../../features/integration/types/Integration';
import PageTemplate from '../templates/PageTemplate';
import { RouteComponent } from '../../routes/Route';
import { HStack } from '@navikt/ds-react';
import { Contact } from '../atoms/Contact';
import SupportContent from '../molecules/SupportContent';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: RouteComponent = () => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.dashboard',
    });
    const history = useNavigate();
    const { statistics, resetIntegration, integrations, getAllIntegrations } =
        useContext(IntegrationContext);
    const activeIntegrations =
        integrations?.filter((integration) => integration.state === 'ACTIVE') || [];
    let currentErrors = 0;
    let totalDispatched = 0;
    const totalActive = activeIntegrations.length;
    statistics?.map((stat: IIntegrationStatistics) => {
        currentErrors += stat.currentErrors;
        totalDispatched += stat.dispatchedInstances;
    });
    const { authorized } = useContext(AuthorizationContext);

    useEffect(() => {
        getAllIntegrations();
        resetIntegration();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!authorized) {
        history('/forbidden');
    }

    const cards: ICard[] = [
        {
            value:
                integrations === undefined || integrations.length === 0
                    ? t('empty')
                    : integrations.length.toString(),
            content:
                integrations !== undefined && integrations.length === 1
                    ? t('oneIntegration')
                    : t('integrations'),
            links: [{ name: t('links.integration'), href: '/integration/new' }],
        },
        {
            value: totalActive === 0 ? t('empty') : totalActive.toString(),
            content: totalActive === 1 ? t('oneActiveIntegration') : t('activeIntegrations'),
            links: [{ name: t('links.integrations'), href: '/integration/list' }],
        },
        {
            value: totalDispatched === 0 ? t('empty') : totalDispatched.toString(),
            content: totalDispatched === 1 ? t('oneInstance') : t('instances'),
            links: [
                {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=TRANSFERRED',
                },
            ],
        },
        {
            value: currentErrors === 0 ? t('empty') : currentErrors.toString(),
            content: currentErrors === 1 ? t('oneError') : t('errors'),
            links: [
                { name: t('links.instances'), href: '/integration/instance/list?statuses=FAILED' },
            ],
        },
    ];

    return (
        <PageTemplate id={'dashboard'} keyPrefix={'pages.dashboard'} customHeading>
            <HStack gap="3" justify="space-between">
                {cards.map((card: ICard, index) => {
                    return (
                        <DashboardCard
                            key={index}
                            id={`dashboard-card-` + index}
                            value={card.value}
                            content={card.content}
                            links={card.links}
                        />
                    );
                })}
            </HStack>
            <SupportContent />
            <Contact />
        </PageTemplate>
    );
};

export default Dashboard;
