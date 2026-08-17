import { HGrid, VStack } from '@navikt/ds-react';
import React, { useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import PageTemplate from '../../shared/components/layout/PageTemplate';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { IntegrationContext } from '../../shared/context/IntegrationContext';
import DashboardCard from './components/DashboardCard';
import SupportContent from './components/SupportContent';
import { ICard } from './types/Card';

const Dashboard: React.FC = () => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.dashboard',
    });
    const history = useNavigate();

    const { resetIntegration, integrations, getAllIntegrations, totalStatistics } =
        useContext(IntegrationContext);

    const totalActive = useMemo(() => {
        const activeIntegrations =
            integrations?.filter((integration) => integration.state === 'ACTIVE') || [];
        return activeIntegrations.length;
    }, [integrations]);

    const { authorized } = useContext(AuthorizationContext);

    useEffect(() => {
        getAllIntegrations();
        resetIntegration();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized]);

    const cards: ICard[] = useMemo(
        () => [
            {
                value: totalStatistics?.inProgress,
                content: t('cards.inProgress'),
                link: {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=IN_PROGRESS',
                },
            },
            {
                value: totalStatistics?.transferred,
                content: t('cards.transferred'),
                link: {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=TRANSFERRED',
                },
            },
            {
                value: totalStatistics?.aborted,
                content: t('cards.aborted'),
                link: {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=ABORTED',
                },
            },
            {
                value: totalStatistics?.failed,
                content: t('cards.failed'),
                link: {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=FAILED',
                },
            },
            {
                value: integrations?.length,
                content:
                    integrations !== undefined && integrations.length === 1
                        ? t('oneIntegration')
                        : t('integrations'),
                link: { name: t('links.integration'), href: '/integration/new' },
            },
            {
                value: totalActive,
                content: totalActive === 1 ? t('oneActiveIntegration') : t('activeIntegrations'),
                link: { name: t('links.integrations'), href: '/integration/list' },
            },
            {
                value: totalStatistics?.total,
                content: t('cards.totalInstances'),
                link: { name: t('links.instances'), href: '/integration/instance/list' },
            },
        ],
        [totalStatistics, integrations, totalActive]
    );

    return (
        <PageTemplate id={'dashboard'} keyPrefix={'pages.dashboard'} customHeading>
            <VStack gap={'8'} maxWidth={'var(--a-breakpoint-2xl)'} marginInline={'auto'}>
                <HGrid id={'dashboard-grid'} gap="6" columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
                    {cards.map((card: ICard, index) => {
                        return (
                            <DashboardCard
                                key={index}
                                id={`dashboard-card-` + index}
                                value={card.value}
                                content={card.content}
                                link={card.link}
                            />
                        );
                    })}
                </HGrid>
                <SupportContent />
            </VStack>
        </PageTemplate>
    );
};

export default Dashboard;
