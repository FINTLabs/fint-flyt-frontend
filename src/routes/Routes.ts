import IRoute from './Route';
import Dashboard from '../components/pages/Dashboard';
import IntegrationForm from '../features/integration/IntegrationForm';
import Configuration from '../components/pages/Configuration';
import UserGuide from '../features/support/components/UserGuide';
import Version from '../components/pages/Version';
import ValueConverting from '../components/pages/ValueConverting';
import Instances from '../components/pages/Instances';
import Integrations from '../components/pages/Integrations';
import Forbidden from '../components/pages/Forbidden';
import UserAccess from '../components/pages/UserAccess';

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
