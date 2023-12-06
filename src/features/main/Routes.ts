import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import IntegrationOverview from "../integrationOverview/IntegrationOverview";
import Instances from "../../components/pages/Instances";
import Support from "../support/Support";
import IntegrationForm from "../integration/IntegrationForm";
import ConfigurationForm from "../configuration/ConfigurationForm";
import ValueConverting from "../valueConverting/ValueConverting";
import UserGuide from "../support/components/UserGuide";
import Version from "../../components/pages/Version";

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
        component: Instances,
        exact: true,
        icon: 'format_list_bulleted',
        inNavigationMenu: true
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
        icon: 'switch_access_shortcut',
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
    },
    {
        path: '/version',
        name: 'version',
        component: Version,
        icon: 'contact_support',
        exact: true,
        inNavigationMenu: true
    },
    {
        path: '/support/guide',
        name: 'guide',
        component: UserGuide,
        icon: 'user_guide',
        exact: true,
        inNavigationMenu: false
    }
]

export default routes;
