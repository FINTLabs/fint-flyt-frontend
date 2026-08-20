import UserAccess from '../features/userAccess/UserAccess';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const UserAccessPage: RouteComponent = () => (
    <PageTemplate id={'useraccess'} keyPrefix={'pages.useraccess'}>
        <UserAccess />
    </PageTemplate>
);

export default UserAccessPage;
