import IRoute from '../interfaces/Route';
import Dashboard from "../pages/Dashboard";
import NewIntegration from "../pages/NewIntegration";
import LogPage from "../pages/LogPage";

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
        path: '/log_page',
        name: 'Logg',
        component: LogPage,
        icon: 'receipt',
        exact: true,
        navMenu: true
    }
]

export default routes;