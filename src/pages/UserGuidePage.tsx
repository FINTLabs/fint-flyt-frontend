import UserGuide from '../features/support/UserGuide';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const UserGuidePage: RouteComponent = () => (
    <PageTemplate id={'user-guide'} keyPrefix={'pages.support'}>
        <UserGuide />
    </PageTemplate>
);

export default UserGuidePage;
