import { Alert } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { IAlertMessage } from '../../shared/components/types/TableTypes';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import IntegrationTable from './components/IntegrationTable';

const Integrations: React.FC = () => {
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
        <>
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
        </>
    );
};

export default Integrations;
