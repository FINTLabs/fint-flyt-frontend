import IntegrationForm from '../features/integration/IntegrationForm';
import { RouteComponent } from '../routes/Route';
import FormPageWrapper from '../shared/components/layout/FormPageWrapper';
import PageTemplate from '../shared/components/layout/PageTemplate';

const IntegrationFormPage: RouteComponent = () => (
    <PageTemplate id={'new'} keyPrefix={'pages.integrationForm'}>
        <FormPageWrapper id={'integration-form'}>
            <IntegrationForm />
        </FormPageWrapper>
    </PageTemplate>
);

export default IntegrationFormPage;
