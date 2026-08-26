import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { TableLayoutWrapper } from '../../shared/components/table/TableLayoutWrapper';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import IntegrationTable from './components/IntegrationTable';
import { IntegrationToolbar } from './components/IntegrationToolbar';

const Integrations: React.FC = () => {
    const { getAllMetadata, allMetadata } = useContext(SourceApplicationContext);
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
        <TableLayoutWrapper toolbar={<IntegrationToolbar />}>
            <IntegrationTable id="integration-table" />
        </TableLayoutWrapper>
    );
};

export default Integrations;
