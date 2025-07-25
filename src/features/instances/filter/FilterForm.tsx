import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
        { value: '1', label: 'ACOS Interact' },
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
    const { clearFilters, saveFilters, filters, updateFilter } = useFilters();
    const [openCard, setOpenCard] = useState<string | null>(null);
    const [allIntegrations, setAllIntegrations] = useState<IIntegration[]>([]);

    const {
        statusesOptions,
        storageStatusesOptions,
        eventCategoriesOptions,
        timeCurrentPeriodOptions,
        instanceStatusEventCategoriesOptions,
    } = useOptions();

    useEffect(() => {
        IntegrationRepository.getAllIntegrations()
            .then((response) => {
                const data = response.data;
                allMetaData.forEach((meta) => {
                    const integration = data.find(
                        (i: IIntegration) => i.sourceApplicationIntegrationId === meta.sourceApplicationIntegrationId
                    );
                    if (integration) {
                        integration.displayName = meta.integrationDisplayName;
                    }
                });
                setAllIntegrations(data);
            })
            .catch(console.error);
    }, [allMetaData]);

    const sourceApplicationIntegrationOptions = useMemo<{ label: string; value: string }[]>(() => {
        return allIntegrations
            .filter(
                (integration) =>
                    !!integration.sourceApplicationIntegrationId &&
                    (!filters.sourceApplicationIds?.length ||
                        filters.sourceApplicationIds.includes(integration.sourceApplicationId?.toString() ?? ''))
            )
            .map((integration) => ({
                label: integration.sourceApplicationIntegrationId ? integration.sourceApplicationIntegrationId : '',
                value: integration.sourceApplicationIntegrationId ? integration.sourceApplicationIntegrationId : '',
            }))
            .filter((option, index, self) => self.findIndex(o => o.value === option.value) === index)
            .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));
    }, [allIntegrations, filters.sourceApplicationIds]);

    const integrationsOptions = useMemo(() => {
        return allIntegrations
            .map((integration) => ({
                label: `${integration.id} - ${integration.displayName}`,
                value: `${integration.id ?? ''}`,
            }))
            .sort((a, b) => {
   
                return Number(a.value) - Number(b.value);
            });
    }, [allIntegrations]);

    // Clear invalid sourceApplicationIntegrationIds when sourceApplicationIds changes
    useEffect(() => {
        if (filters.sourceApplicationIntegrationIds?.length) {
            const validIds = sourceApplicationIntegrationOptions.map(opt => opt.value);
            const filtered = filters.sourceApplicationIntegrationIds.filter(id => validIds.includes(id));
            if (filtered.length !== filters.sourceApplicationIntegrationIds.length) {
                updateFilter('sourceApplicationIntegrationIds', filtered);
            }
        }
    }, [filters.sourceApplicationIds, sourceApplicationIntegrationOptions, filters.sourceApplicationIntegrationIds, updateFilter]);

    const toggleCard = useCallback((cardId: string) => {
        setOpenCard((prev) => (prev === cardId ? null : cardId));
    }, []);

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
