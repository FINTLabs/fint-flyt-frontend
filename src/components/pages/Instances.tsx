import { Alert, Box, HGrid } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { AuthorizationContext } from '../../context/AuthorizationContext';
import { SourceApplicationContext } from '../../context/SourceApplicationContext';
import { TableSelectProvider } from '../../features/instances/batchProcess/TableSelectContext';
import InstanceTable from '../../features/instances/components/InstanceTable';
import { FilterProvider } from '../../features/instances/filter/FilterContext';
import FilterToolbar from '../../features/instances/filter/FilterToolbar';
import { FilterOptionsProvider } from '../../features/instances/filter/OptionsContext';
import { RouteComponent } from '../../routes/Route';
import PageTemplate from '../templates/PageTemplate';
import { IAlertMessage } from '../types/TableTypes';

const Instances: RouteComponent = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
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
        <FilterProvider>
            <FilterOptionsProvider>
                <TableSelectProvider>
                    <PageTemplate
                        id={'instances'}
                        keyPrefix={'pages.instances'}
                        headingHelpText={{
                            info: t('help.header'),
                        }}
                    >
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
                    </PageTemplate>
                </TableSelectProvider>
            </FilterOptionsProvider>
        </FilterProvider>
    );
};

export default Instances;
