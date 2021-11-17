import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import Log from "../log/Log";
import NewIntegrationForm from "../integration/NewIntegrationForm";

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
        name: 'Ny integrasjon',
        component: NewIntegrationForm,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/integration_overview',
        name: 'Integrasjonsoversikt',
        component: NewIntegrationForm,
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
