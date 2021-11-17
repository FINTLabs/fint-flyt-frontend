import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import Log from "../log/Log";
import NewIntegrationForm from "../integration/NewIntegrationForm";
import NewIntegrationFormSteps from "../integration/NewIntegrationFormSteps";
import Overview from "../overview/Overview";

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
        component: NewIntegrationForm,
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
        inNavigationMenu: true
    },
    {
        path: '/integration_overview',
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
]

export default routes;
