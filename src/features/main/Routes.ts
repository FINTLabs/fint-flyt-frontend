import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import Log from "../log/Log";
import IntegrationOverview from "../integrationOverview/IntegrationOverview";
import InstanceOverview from "../instanceOverview/InstanceOverview";
import Support from "../support/Support";
import ConfigurationForm from "../integration/ConfigurationForm";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        exact: true,
        icon: 'dashboard',
        inNavigationMenu: true
    },
    {
        path: '/integration/configuration/new',
        name: 'newIntegration',
        component: ConfigurationForm,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/integration/configuration/edit',
        name: 'editIntegration',
        component: ConfigurationForm,
        exact: true
    },
    {
        path: '/integration/configuration/new-configuration',
        name: 'newConfiguration',
        component: ConfigurationForm,
        exact: true
    },
    {
        path: '/integration/configuration/list',
        name: 'integrationOverview',
        component: IntegrationOverview,
        exact: true,
        icon: 'format_list_bulleted',
        inNavigationMenu: true
    },
    {
        path: '/integration/configuration/details',
        name: 'integrationDetails',
        component: IntegrationOverview,
        exact: true,
    },
    {
        path: '/integration/',
        name: 'integrationPanel',
        component: IntegrationOverview,
        exact: true,
    },
    {
        path: '/integration/instance/list',
        name: 'instanceOverview',
        component: InstanceOverview,
        exact: true,
        icon: 'format_list_bulleted',
        inNavigationMenu: true
    },
    {
        path: '/log',
        name: 'log',
        component: Log,
        icon: 'event-note-icon',
        exact: true,
        inNavigationMenu: true
    },
    {
        path: '/support',
        name: 'support',
        component: Support,
        icon: 'contact_support',
        exact: true,
        inNavigationMenu: true
    }
]

export default routes;
