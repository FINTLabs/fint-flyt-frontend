import Configuration from '../features/configuration/Configuration';
import { RouteComponent } from '../routes/Route';
import ConfigurationProvider from '../shared/context/ConfigurationContext';

const ConfigurationPage: RouteComponent = () => (
    <ConfigurationProvider>
        <Configuration />
    </ConfigurationProvider>
);

export default ConfigurationPage;
