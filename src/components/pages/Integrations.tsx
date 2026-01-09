import React, { useContext, useEffect, useState } from 'react';
import IntegrationTable from '../../features/integrations/components/IntegrationTable';
import PageTemplate from '../templates/PageTemplate';
import { SourceApplicationContext } from '../../context/SourceApplicationContext';
import { RouteComponent } from '../../routes/Route';
import { useNavigate } from 'react-router';
import { Alert } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { IAlertMessage } from '../types/TableTypes';

const Integrations: RouteComponent = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });
    const { getAllMetadata, allMetadata } = useContext(SourceApplicationContext);
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized]);

    useEffect(() => {
        getAuthorization();
    }, []);

    useEffect(() => {
        if (!allMetadata) {
            getAllMetadata(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageTemplate
            id={'integration'}
            keyPrefix={'pages.integrations'}
            headingHelpText={{ info: t('help.header') }}
            headerButton={{
                text: t('button.newIntegration'),
                to: '/integration/new',
            }}
        >
            {error && (
                <Alert style={{ maxWidth: '100%' }} variant="error">
                    {error.message}
                </Alert>
            )}
            <IntegrationTable
                onError={(error) => {
                    setError(error);
                }}
                id={'integration-table'}
            />
        </PageTemplate>
    );
};

export default Integrations;
