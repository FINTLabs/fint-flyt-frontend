import React, { useContext, useEffect } from 'react';
import { IntegrationContext } from '../../context/IntegrationContext';
import DashboardCard from '../organisms/DashboardCard';
import { ICard } from '../../features/dashboard/Card';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../templates/PageTemplate';
import { RouteComponent } from '../../routes/Route';
import { HGrid } from '@navikt/ds-react';
import { Contact } from '../atoms/Contact';
import SupportContent from '../molecules/SupportContent';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router';

const Dashboard: RouteComponent = () => {
    // const [totalStats, setTotalStats] = useState<ITotalStatistics>();
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.dashboard',
    });
    const history = useNavigate();

    const { resetIntegration, integrations, getAllIntegrations, totalStatistics } =
        useContext(IntegrationContext);
    const activeIntegrations =
        integrations?.filter((integration) => integration.state === 'ACTIVE') || [];
    // let currentErrors = 0;
    // let totalDispatched = 0;
    const totalActive = activeIntegrations.length;
    // statistics?.map((stat: IIntegrationStatistics) => {
    //     currentErrors += stat.currentErrors;
    //     totalDispatched += stat.dispatchedInstances;
    // });
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
                !totalStatistics?.inProgress || totalStatistics.inProgress === 0
                    ? t('empty')
                    : totalStatistics.inProgress.toString(),
            content: t('cards.inProgress'),
            links: [
                {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=IN_PROGRESS',
                },
            ],
        },
        {
            value:
                !totalStatistics?.transferred || totalStatistics.transferred === 0
                    ? t('empty')
                    : totalStatistics.transferred.toString(),
            content: t('cards.transferred'),
            links: [
                {
                    name: t('links.instances'),
                    href: '/integration/instance/list?statuses=TRANSFERRED',
                },
            ],
        },
        {
            value:
                !totalStatistics?.aborted || totalStatistics.aborted === 0
                    ? t('empty')
                    : totalStatistics.aborted.toString(),
            content: t('cards.aborted'),
            links: [
                { name: t('links.instances'), href: '/integration/instance/list?statuses=ABORTED' },
            ],
        },
        {
            value:
                !totalStatistics?.failed || totalStatistics.failed === 0
                    ? t('empty')
                    : totalStatistics.failed.toString(),
            content: t('cards.failed'),
            links: [
                { name: t('links.instances'), href: '/integration/instance/list?statuses=FAILED' },
            ],
        },
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
            value:
                !totalStatistics?.total || totalStatistics.total === 0
                    ? t('empty')
                    : totalStatistics.total.toString(),
            content: t('cards.totalInstances'),
            links: [{ name: t('links.instances'), href: '/integration/instance/list' }],
        },
    ];

    return (
        <PageTemplate id={'dashboard'} keyPrefix={'pages.dashboard'} customHeading>
            <HGrid gap="6" columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
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
            </HGrid>
            <SupportContent />
            <Contact />
        </PageTemplate>
    );
};

export default Dashboard;
