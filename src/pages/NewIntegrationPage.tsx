import NewIntegrationForm from '../features/newIntegration/NewIntegrationForm';
import { RouteComponent } from '../routes/Route';
import FormPageWrapper from '../shared/components/layout/FormPageWrapper';
import PageTemplate from '../shared/components/layout/PageTemplate';

const NewIntegrationPage: RouteComponent = () => (
    <PageTemplate id={'new'} keyPrefix={'pages.integrationForm'}>
        <FormPageWrapper id={'integration-form'}>
            <NewIntegrationForm />
        </FormPageWrapper>
    </PageTemplate>
);

export default NewIntegrationPage;
