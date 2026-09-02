import Changelog from '../features/changelog/Changelog';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const ChangelogPage: RouteComponent = () => (
    <PageTemplate id={'version'} keyPrefix={'pages.version'}>
        <Changelog />
    </PageTemplate>
);

export default ChangelogPage;
