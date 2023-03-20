import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import IntegrationOverview from "../integrationOverview/IntegrationOverview";
import InstanceOverview from "../instanceOverview/InstanceOverview";
import Support from "../support/Support";
import {IntegrationForm} from "../integration/IntegrationForm";
import Admin from "../admin/Admin";
import ConfigurationForm from "../configuration/ConfigurationForm";

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
        path: '/integration/new',
        name: 'newIntegration',
        component: IntegrationForm,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/configuration/new-configuration',
        name: 'newConfiguration',
        component: ConfigurationForm,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/integration/configuration/new',
        name: 'newIntegration',
        component: ConfigurationForm,
        exact: true,
    },
    {
        path: '/integration/configuration/edit',
        name: 'editIntegration',
        component: ConfigurationForm,
        exact: true
    },
    {
        path: '/integration/list',
        name: 'integrationOverview',
        component: IntegrationOverview,
        exact: true,
        icon: 'format_list_bulleted',
        inNavigationMenu: true
    },
    {
        path: '/integration/panel',
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
        path: '/instance/',
        name: 'instancePanel',
        component: InstanceOverview,
        exact: true,
    },
    {
        path: '/support',
        name: 'support',
        component: Support,
        icon: 'contact_support',
        exact: true,
        inNavigationMenu: true
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        exact: true,
        inNavigationMenu: false
    }
]

export default routes;
