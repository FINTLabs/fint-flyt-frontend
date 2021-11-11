import IRoute from './Route';
import Dashboard from "../dashboard/Dashboard";
import NewIntegration from "../integration/NewIntegration";
import Log from "../log/Log";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        exact: true,
        icon: 'dashboard',
        navMenu: true
    },
    {
        path: '/new_integration',
        name: 'Ny integrasjon',
        component: NewIntegration,
        exact: true,
        icon: 'add',
        navMenu: true
    },
    {
        path: '/integration_overview',
        name: 'Integrasjonsoversikt',
        component: NewIntegration,
        exact: true,
        icon: 'sync',
        navMenu: true
    },
    {
        path: '/log',
        name: 'Logg',
        component: Log,
        icon: 'receipt',
        exact: true,
        navMenu: true
    }
]

export default routes;
