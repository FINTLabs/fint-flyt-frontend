import Dashboard from '../features/dashboard/Dashboard';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const DashboardPage: RouteComponent = () => (
    <PageTemplate id={'dashboard'} keyPrefix={'pages.dashboard'} customHeading>
        <Dashboard />
    </PageTemplate>
);

export default DashboardPage;
