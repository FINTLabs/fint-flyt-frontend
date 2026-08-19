import { Alert, Box, HGrid } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { IAlertMessage } from '../../shared/components/types/TableTypes';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import InstanceTable from './components/InstanceTable';
import FilterToolbar from './filter/FilterToolbar';

const Instances: React.FC = () => {
    const { getAllMetadata } = useContext(SourceApplicationContext);
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
        getAllMetadata(true);
    }, []);

    return (
        <>
            {error && (
                <Alert style={{ maxWidth: '100%' }} variant="error">
                    {error.message}
                </Alert>
            )}
            <FilterToolbar />
            <HGrid gap="4">
                <Box id={'instance-table-container'}>
                    <InstanceTable
                        onError={(error) => {
                            setError(error);
                        }}
                    />
                </Box>
            </HGrid>
        </>
    );
};

export default Instances;
