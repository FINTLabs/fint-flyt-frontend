import Configuration from '../features/configuration/Configuration';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';
import ConfigurationProvider from '../shared/context/ConfigurationContext';

const ConfigurationPage: RouteComponent = () => (
    <ConfigurationProvider>
        <PageTemplate id={'configuration'} keyPrefix={'pages.configuration'} wide customHeading>
            <Configuration />
        </PageTemplate>
    </ConfigurationProvider>
);

export default ConfigurationPage;
