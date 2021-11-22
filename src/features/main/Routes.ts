import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import Log from "../log/Log";
import NewIntegrationPage from "../integration/NewIntegrationPage";
import NewIntegrationFormSteps from "../integration/NewIntegrationFormSteps";
import Overview from "../overview/Overview";
import Support from "../support/support";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        exact: true,
        icon: 'dashboard',
        inNavigationMenu: true
    },
    {
        path: '/new_integration',
        name: 'Ny integrasjon (acc)',
        component: NewIntegrationPage,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/new_integration_steps',
        name: 'Ny integrasjon (step)',
        component: NewIntegrationFormSteps,
        exact: true,
        icon: 'add',
        inNavigationMenu: false
    },
    {
        path: '/overview',
        name: 'Integratsjonsoversikt',
        component: Overview,
        exact: true,
        icon: 'sync',
        inNavigationMenu: true
    },
    {
        path: '/log',
        name: 'Logg',
        component: Log,
        icon: 'receipt',
        exact: true,
        inNavigationMenu: true
    }
    ,
    {
        path: '/support',
        name: 'Support',
        component: Support,
        icon: 'contact_support',
        exact: true,
        inNavigationMenu: true
    }
]

export default routes;
