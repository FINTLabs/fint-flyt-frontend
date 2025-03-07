import React, { useEffect, useState } from 'react';
import { Box, Button, HStack, VStack } from '@navikt/ds-react';
// import SortSelect from './sortSelect';
import TimeCard from './timeCard';
import IntegrationCard from './integrationCard';
import InstanceCard from './instanceCard';
import StatusCard from './statusCard';
import AdvancedCard from './advancedCard';
import { useFilters } from './FilterContext';
import { OptionsProvider, useOptions } from './OptionsContext';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import IntegrationRepository from '../../../api/IntegrationRepository';
import { IIntegration } from '../../integration/types/Integration';

const apiOptions = {
    sourceApplicationIdsOptions: [
        { value: '1', label: 'COS Interact' },
        { value: '2', label: 'eGrunnerverv' },
        { value: '3', label: 'Digisak' },
        { value: '4', label: 'VIGO' },
        { value: '5', label: 'Altinn' },
        { value: '6', label: 'HMSReg' },
    ],
};

interface FilterFormProps {
    allMetaData: IIntegrationMetadata[];
}

const FilterForm: React.FC<FilterFormProps> = ({ allMetaData }) => {
    const { clearFilters, saveFilters, filters } = useFilters();
    const [openCard, setOpenCard] = useState<string | null>(null);
    const [sourceApplicationIntegrationOptions, setSourceApplicationIntegrationOptions] = useState<
        { label: string; value: string }[]
    >([]);
    const [integrationsOptions, setIntegrationsOptions] = useState<
        { label: string; value: string }[]
    >([]);

    const {
        statusesOptions,
        storageStatusesOptions,
        eventCategoriesOptions,
        timeCurrentPeriodOptions,
        instanceStatusEventCategoriesOptions,
    } = useOptions();

    const getIntegrations = async () => {
        try {
            const integrationResponse = await IntegrationRepository.getAllIntegrations();
            const data = integrationResponse.data;

            allMetaData.forEach((value: IIntegrationMetadata) => {
                data.forEach((integration: IIntegration) => {
                    if (
                        integration.sourceApplicationIntegrationId ===
                        value.sourceApplicationIntegrationId
                    ) {
                        integration.displayName = value.integrationDisplayName;
                    }
                });
            });

            let options = data.map((integration: IIntegration) => ({
                label: integration.sourceApplicationIntegrationId,
                value: integration.sourceApplicationIntegrationId,
            }));
            setSourceApplicationIntegrationOptions(options);

            options = data.map((integration: IIntegration) => ({
                label: `${integration.id} - ${integration.displayName}`,
                value: integration.id,
            }));

            setIntegrationsOptions(options);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getIntegrations();
    }, [filters]);

    const toggleCard = (cardId: string) => {
        setOpenCard((prev) => (prev === cardId ? null : cardId));
    };

    return (
        <Box minWidth={'300px'} className={'p-20'} data-testid="filters-form">
            <VStack gap="4">
                {/*<SortSelect />*/}

                {/* Single Selection (Radio) */}
                <TimeCard
                    id="timeCard"
                    isOpen={openCard === 'timeCard'}
                    toggleOpen={toggleCard}
                    timeCurrentPeriodOptions={timeCurrentPeriodOptions}
                />

                {/* Multi Selection (Chips, Combobox) */}
                <IntegrationCard
                    id="integration"
                    isOpen={openCard === 'integration'}
                    toggleOpen={toggleCard}
                    integrationOptions={integrationsOptions}
                    sourceApplicationIdsOptions={apiOptions.sourceApplicationIdsOptions}
                    sourceApplicationIntegrationOptions={sourceApplicationIntegrationOptions}
                />

                {/* Comma-separated Text Inputs */}
                <InstanceCard
                    id="instance"
                    isOpen={openCard === 'instance'}
                    toggleOpen={toggleCard}
                />

                {/* Multi Selection (Chips) */}
                <StatusCard
                    id="status"
                    isOpen={openCard === 'status'}
                    toggleOpen={toggleCard}
                    associatedEventNamesOptions={instanceStatusEventCategoriesOptions}
                    statusesOptions={statusesOptions}
                />

                {/* Multi Selection (Chips + Combobox) */}
                <AdvancedCard
                    id="advanced"
                    isOpen={openCard === 'advanced'}
                    toggleOpen={toggleCard}
                    associatedEventNamesOptions={eventCategoriesOptions}
                    storageStatusesOptions={storageStatusesOptions}
                />

                <HStack gap={'10'}>
                    <Button
                        onClick={() => {
                            saveFilters();
                        }}>
                        Søk
                    </Button>
                    <Button variant={'tertiary'} onClick={clearFilters}>
                        Tilbakestill
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default function Filters({ allMetaData }: FilterFormProps) {
    return (
        <OptionsProvider>
            <FilterForm allMetaData={allMetaData} />
        </OptionsProvider>
    );
}
