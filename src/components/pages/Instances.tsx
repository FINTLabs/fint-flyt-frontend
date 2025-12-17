import React, { useContext, useEffect, useState } from 'react';
import { Alert, Box, Button, HGrid, HStack, Loader, VStack } from '@navikt/ds-react';
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
import { ChevronLeftDoubleCircleIcon, ChevronRightDoubleCircleIcon } from '@navikt/aksel-icons';
import { FilterProvider } from '../../features/instances/filter/FilterContext';
import ErrorDialog from '../molecules/ErrorDialog';

const Instances: RouteComponent = () => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [selectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const { allMetadata, getAllMetadata } = useContext(SourceApplicationContext);
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();
    const [showFilters, setShowFilters] = useState(false);

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

                <HGrid columns={showFilters ? 'minmax(450px, 15%) 1fr' : '75px 1fr'} gap="4">
                    {showFilters ? (
                        <Box
                            id="filter-container"
                            background="surface-default"
                            borderRadius="medium"
                            borderWidth="1"
                            borderColor="border-default"
                            position="relative"
                        >
                            <VStack gap={'2'}>
                                <Button
                                    variant="tertiary"
                                    type="button"
                                    icon={
                                        <ChevronLeftDoubleCircleIcon fontSize="2rem" aria-hidden />
                                    }
                                    onClick={() => setShowFilters(false)}
                                    style={{
                                        justifyContent: 'end',
                                        borderRadius:
                                            'var(--a-border-radius-medium) var(--a-border-radius-medium)  0 0',
                                    }}
                                />
                                {allMetadata && <Filters allMetaData={allMetadata} />}
                            </VStack>
                        </Box>
                    ) : (
                        <Box
                            id="filter-container"
                            borderRadius="medium"
                            borderWidth="1"
                            borderColor="border-default"
                            position="relative"
                            as={Button}
                            variant="tertiary"
                            icon={<ChevronRightDoubleCircleIcon fontSize="2rem" aria-hidden />}
                            onClick={() => setShowFilters(true)}
                            style={{ alignItems: 'start' }}
                        ></Box>
                    )}
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
