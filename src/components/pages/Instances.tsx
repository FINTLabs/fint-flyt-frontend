import React, { useContext, useEffect, useState } from 'react';
import { Alert, Box, HGrid } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import { IEvent } from '../../features/instances/types/Event';
import PageTemplate from '../templates/PageTemplate';
import InstanceTable from '../../features/instances/components/InstanceTable';
import { RouteComponent } from '../../routes/Route';
import { SourceApplicationContext } from '../../context/SourceApplicationContext';
import { IAlertMessage } from '../types/TableTypes';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router';
import Filters from '../../features/instances/filter/FilterForm';
import { FilterProvider } from '../../features/instances/filter/FilterContext';
import ErrorDialog from '../molecules/ErrorDialog';

const Instances: RouteComponent = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [selectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);
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
                <Filters />
                <HGrid gap="4">
                    <Box id={'instance-table-container'}>
                        <InstanceTable
                            onError={(error) => {
                                setError(error);
                            }}
                        />
                    </Box>
                </HGrid>

                <ErrorDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    errors={selectedRow?.errors}
                />
            </PageTemplate>
        </FilterProvider>
    );
};

export default Instances;
