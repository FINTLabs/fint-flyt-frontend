import Configuration from '../features/configuration/Configuration';
import ConfigurationProvider from '../features/configuration/context/ConfigurationContext';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const ConfigurationPage: RouteComponent = () => (
    <ConfigurationProvider>
        <PageTemplate id={'configuration'} keyPrefix={'pages.configuration'} wide customHeading>
            <Configuration />
        </PageTemplate>
    </ConfigurationProvider>
);

export default ConfigurationPage;
