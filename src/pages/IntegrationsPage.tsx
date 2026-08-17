import Integrations from '../features/integrations/Integrations';
import { RouteComponent } from '../routes/Route';
import PageTemplate from '../shared/components/layout/PageTemplate';

const IntegrationsPage: RouteComponent = () => (
    <PageTemplate
        id={'integration'}
        keyPrefix={'pages.integrations'}
        headingHelpTextKey="help.header"
        headerButton={{
            textKey: 'button.newIntegration',
            to: '/integration/new',
        }}
    >
        <Integrations />
    </PageTemplate>
);

export default IntegrationsPage;
