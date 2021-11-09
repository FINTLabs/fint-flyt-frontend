import IRoute from '../interfaces/route';
import Dashboard from "../pages/dashboard";
import newIntegration from "../pages/newIntegration";
import dashboard from "../pages/dashboard";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        exact: true,
        icon: 'dashboard'
    },
    {
        path: '/new_integration',
        name: 'Ny integrasjon',
        component: newIntegration,
        exact: true,
        icon: 'add'
    },
    {
        path: '/integration_overview',
        name: 'Integrasjonsoversikt',
        component: newIntegration,
        exact: true,
        icon: 'sync'
    }

]

export default routes;