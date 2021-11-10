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
    },
    {
        path: '/new_integration',
        name: 'Ny integrasjon',
        component: NewIntegration,
        exact: true,
    },
    {
        path: '/integration_overview',
        name: 'Integrasjonsoversikt',
        component: NewIntegration,
        exact: true,
    },
    {
        path: '/log_page',
        name: 'Logg',
        component: LogPage,
        exact: true
    }
]

export default routes;