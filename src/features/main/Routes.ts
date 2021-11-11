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
        inNavigationMenu: true
    },
    {
        path: '/new_integration',
        name: 'Ny integrasjon',
        component: NewIntegration,
        exact: true,
        icon: 'add',
        inNavigationMenu: true
    },
    {
        path: '/integration_overview',
        name: 'Integrasjonsoversikt',
        component: NewIntegration,
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
