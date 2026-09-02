import { lazy } from 'react';

import IRoute from './Route';

const Dashboard = lazy(() => import('../pages/DashboardPage'));
const Forbidden = lazy(() => import('../pages/./ForbiddenPage'));
const IntegrationForm = lazy(() => import('../pages/IntegrationFormPage'));
const Configuration = lazy(() => import('../pages/ConfigurationPage'));
const UserGuide = lazy(() => import('../pages/UserGuidePage'));
const Changelog = lazy(() => import('../pages/./ChangelogPage'));
const ValueConverting = lazy(() => import('../pages/ValueConvertingPage'));
const Instances = lazy(() => import('../pages/InstancesPage'));
const Integrations = lazy(() => import('../pages/IntegrationsPage'));
const UserAccess = lazy(() => import('../pages/UserAccessPage'));

const routes: IRoute[] = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        exact: true,
        inNavigationMenu: true,
    },
    {
        path: '/integration/new',
        name: 'integration',
        component: IntegrationForm,
        exact: true,
    },
    {
        path: '/integration/configuration/new-configuration',
        name: 'integration',
        component: Configuration,
        exact: true,
    },
    {
        path: '/integration/configuration/edit',
        name: 'editIntegration',
        component: Configuration,
        exact: true,
    },
    {
        path: 'configuration/new-configuration',
        name: 'editIntegration',
        component: Configuration,
        exact: true,
    },
    {
        path: '/integration/list',
        name: 'integrations',
        component: Integrations,
        exact: true,
        inNavigationMenu: true,
    },
    {
        path: '/integration/panel',
        name: 'integrationPanel',
        component: Integrations,
        exact: true,
    },
    {
        path: '/integration/instance/list',
        name: 'instances',
        component: Instances,
        exact: true,
        inNavigationMenu: true,
    },
    {
        path: '/instance/',
        name: 'instancePanel',
        component: Instances,
        exact: true,
    },
    {
        path: '/valueconverting',
        name: 'valueConverting',
        component: ValueConverting,
        exact: true,
        inNavigationMenu: true,
    },
    {
        path: '/changelog',
        name: 'version',
        component: Changelog,
        exact: true,
        inNavigationMenu: true,
    },
    {
        path: '/forbidden',
        name: 'forbidden',
        component: Forbidden,
        exact: true,
    },
    {
        path: '/support/guide',
        name: 'guide',
        component: UserGuide,
        exact: true,
        inNavigationMenu: false,
    },
    {
        path: '/useraccess',
        name: 'useraccess',
        component: UserAccess,
        exact: true,
        inNavigationMenu: false,
    },
];

export default routes;
