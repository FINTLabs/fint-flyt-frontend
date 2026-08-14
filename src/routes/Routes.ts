import { lazy } from 'react';

import IRoute from './Route';

const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const IntegrationForm = lazy(() => import('../features/integration/IntegrationForm'));
const Configuration = lazy(() => import('../features/configuration/Configuration'));
const UserGuide = lazy(() => import('../features/support/UserGuide'));
const Version = lazy(() => import('../features/changelog/Version'));
const ValueConverting = lazy(() => import('../features/valueConverting/ValueConverting'));
const Instances = lazy(() => import('../features/instances/Instances'));
const Integrations = lazy(() => import('../features/integrations/Integrations'));
const Forbidden = lazy(() => import('../pages/Forbidden'));
const UserAccess = lazy(() => import('../features/userAccess/UserAccess'));

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const IntegrationFormPage = lazy(() => import('../features/integration/IntegrationForm'));
const ConfigurationPage = lazy(() => import('../pages/ConfigurationPage'));
const UserGuidePage = lazy(() => import('../pages/UserGuidePage'));
const VersionPage = lazy(() => import('../pages/VersionPage'));
const ValueConvertingPage = lazy(() => import('../pages/ValueConvertingPage'));
const InstancesPage = lazy(() => import('../pages/InstancesPage'));
const IntegrationsPage = lazy(() => import('../pages/IntegrationsPage'));
const ForbiddenPage = lazy(() => import('../pages/Forbidden'));
const UserAccessPage = lazy(() => import('../pages/UserAccessPage'));

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
        component: Version,
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
        component: UserGuidePage,
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
