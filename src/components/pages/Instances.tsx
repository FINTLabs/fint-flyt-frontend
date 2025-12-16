import React, { useContext, useEffect, useState } from 'react';
import { Alert, Box, Button, HGrid, HStack, Loader } from '@navikt/ds-react';
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

                {!showFilters && (
                    <HStack gap={'10'}>
                        <Button
                            variant="tertiary"
                            onClick={() => setShowFilters(true)}
                            icon={<ChevronRightDoubleCircleIcon aria-hidden />}
                            size="small"
                        >
                            Filters
                        </Button>
                    </HStack>
                )}

                <HGrid columns={showFilters ? 'minmax(450px, 15%) 1fr' : '1fr'} gap="2">
                    {showFilters && (
                        <Box
                            id="filter-container"
                            background="surface-default"
                            padding="6"
                            paddingBlock="10"
                            borderRadius="large"
                            borderWidth="2"
                            borderColor="border-subtle"
                            position="relative"
                        >
                            <Button
                                variant="tertiary"
                                size="small"
                                icon={<ChevronLeftDoubleCircleIcon aria-hidden />}
                                onClick={() => setShowFilters(false)}
                                style={{ position: 'absolute', top: '5px', right: '10px' }}
                            >
                                Lukk
                            </Button>

                            {allMetadata && <Filters allMetaData={allMetadata} />}
                        </Box>
                    )}
                    <Box
                        id={'instance-table-container'}
                        background={'surface-default'}
                        padding="6"
                        borderRadius={'large'}
                        borderWidth="2"
                        borderColor={'border-subtle'}
                    >
                        {allMetadata ? (
                            <InstanceTable
                                onError={(error) => {
                                    setError(error);
                                }}
                            />
                        ) : (
                            <Loader />
                        )}
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
