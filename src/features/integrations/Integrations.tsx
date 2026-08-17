import { Alert } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import PageTemplate from '../../shared/components/layout/PageTemplate';
import { IAlertMessage } from '../../shared/components/types/TableTypes';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import IntegrationTable from './components/IntegrationTable';

const Integrations: React.FC = () => {
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
