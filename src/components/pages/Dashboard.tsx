import React, { useContext, useEffect, useMemo } from 'react';
import { IntegrationContext } from '../../context/IntegrationContext';
import DashboardCard from '../organisms/DashboardCard';
import { ICard } from '../../features/dashboard/Card';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../templates/PageTemplate';
import { RouteComponent } from '../../routes/Route';
import { HGrid } from '@navikt/ds-react';
import SupportContent from '../molecules/SupportContent';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router';

const Dashboard: RouteComponent = () => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.dashboard',
    });
    const history = useNavigate();

    const { resetIntegration, integrations, getAllIntegrations, totalStatistics } =
        useContext(IntegrationContext);
    const activeIntegrations =
        integrations?.filter((integration) => integration.state === 'ACTIVE') || [];
    const totalActive = activeIntegrations.length;
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
        [totalStatistics]
    );

    return (
        <PageTemplate id={'dashboard'} keyPrefix={'pages.dashboard'} customHeading>
            <HGrid gap="6" columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
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
        </PageTemplate>
    );
};

export default Dashboard;
