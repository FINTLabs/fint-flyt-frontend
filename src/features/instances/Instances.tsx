import { Alert, Box, HGrid } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import PageTemplate from '../../shared/components/layout/PageTemplate';
import { IAlertMessage } from '../../shared/components/types/TableTypes';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../shared/context/SourceApplicationContext';
import { TableSelectProvider } from './batchProcess/TableSelectContext';
import InstanceTable from './components/InstanceTable';
import { FilterProvider } from './filter/FilterContext';
import FilterToolbar from './filter/FilterToolbar';
import { FilterOptionsProvider } from './filter/OptionsContext';

const Instances: React.FC = () => {
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
