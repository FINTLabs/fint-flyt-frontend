import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import Log from "../log/Log";
import IntegrationOverview from "../integrationOverview/IntegrationOverview";
import InstanceOverview from "../instanceOverview/InstanceOverview";
import Support from "../support/Support";
import {IntegrationForm} from "../integration/IntegrationForm";
import Admin from "../admin/Admin";
import ConfigurationForm from "../configuration/ConfigurationForm";
import ValueConverting from "../valueConverting/ValueConverting";
import ValueConvertingForm from "../valueConverting/components/ValueConvertingForm";

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
        name: 'integration',
        component: IntegrationForm,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/integration/configuration/new-configuration',
        name: 'integration',
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
        path: 'configuration/new-configuration',
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
        path: '/log',
        name: 'log',
        component: Log,
        icon: 'event-note-icon',
        exact: true,
        inNavigationMenu: false
    },
    {
        path: '/valueconverting',
        name: 'valueConverting',
        component: ValueConverting,
        icon: 'switch_access_shortcut',
        exact: true,
        inNavigationMenu: true
    },
    {
        path: '/valueconverting/new',
        name: 'newValueConverting',
        component: ValueConvertingForm,
        exact: true,
    },
    {
        path: '/valueconverting/view',
        name: 'wiewValueConverting',
        component: ValueConvertingForm,
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
