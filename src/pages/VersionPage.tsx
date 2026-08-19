import Version from '../features/changelog/Version';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const VersionPage: RouteComponent = () => (
    <PageTemplate id={'version'} keyPrefix={'pages.version'}>
        <Version />
    </PageTemplate>
);

export default VersionPage;
