import React, { lazy } from 'react';
import IRoute from './Route';

const Dashboard = lazy(() => import('../components/pages/Dashboard'));
const IntegrationForm = lazy(() => import('../features/integration/IntegrationForm'));
const Configuration = lazy(() => import('../components/pages/Configuration'));
const UserGuide = lazy(() => import('../features/support/components/UserGuide'));
const Version = lazy(() => import('../components/pages/Version'));
const ValueConverting = lazy(() => import('../components/pages/ValueConverting'));
const Instances = lazy(() => import('../components/pages/Instances'));
const Integrations = lazy(() => import('../components/pages/Integrations'));
const Forbidden = lazy(() => import('../components/pages/Forbidden'));
const UserAccess = lazy(() => import('../components/pages/UserAccess'));

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
        path: '/version',
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
    }
];

export default routes;
