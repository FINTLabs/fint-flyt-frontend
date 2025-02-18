import React, { useContext, useState } from 'react';
import { Box, Button, HStack, VStack } from '@navikt/ds-react';
import SortSelect from './sortSelect';
import TimeCard from './timeCard';
import IntegrationCard from './integrationCard';
import InstanceCard from './instanceCard';
import StatusCard from './statusCard';
import AdvancedCard from './advancedCard';
import { useFilters } from './FilterContext';
import { OptionsProvider, useOptions } from './OptionsContext';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import { ISummary } from '../types/Event';

const apiOptions = {
    sourceApplicationIdsOptions: [
        { value: '1', label: 'COS Interact' },
        { value: '2', label: 'eGrunnerverv' },
        { value: '3', label: 'Digisak' },
        { value: '4', label: 'VIGO' },
        { value: '5', label: 'Altinn' },
        { value: '6', label: 'HMSReg' },
    ],
    // integrationOptions: [
    //     // integrationIds
    //     { value: '1', label: 'Fartøyvern' },
    //     { value: '2', label: 'Arkivsak' },
    //     {
    //         value: '3',
    //         label: 'Tillatelse til inngrep i automatisk fredet kulturminne for enkelttiltak',
    //     },
    //     { value: '4', label: 'Journalpost' },
    //     { value: '5', label: 'Tilskudd til freda bygninger i privat eie' },
    // ],
    // statusesOptions: [
    //     { value: '1', label: 'Under behandling' },
    //     { value: '2', label: 'Overført' },
    //     { value: '3', label: 'Avvist' },
    //     { value: '4', label: 'Feilet' },
    // ],
    // associatedEventNamesOptions: [
    //     { value: '1', label: 'Mellomlagring av instans slettet' },
    //     { value: '2', label: 'Instans klar for sending til destinasjon' },
    //     { value: '3', label: 'Instans konvertert' },
    // ],
    // storageStatusesOptions: [
    //     { value: '1', label: 'Lagret' },
    //     { value: '2', label: 'Lagret og slettet' },
    //     { value: '3', label: 'Ikke lagret' },
    // ],
    // timeCurrentPeriodOptions: [
    //     { value: '1', label: 'Denne time' },
    //     { value: '3', label: 'Denne døgnen' },
    //     { value: '4', label: 'Denne uke' },
    //     { value: '5', label: 'Denne måned' },
    //     { value: '6', label: 'Denne år' },
    // ],

    // connectedEventsOptions: [
    //     { id: '1', name: 'Avansert 1' },
    //     { id: '2', name: 'Avansert 2' },
    //     { id: '3', name: 'Avansert 3' },
    // ],
};

interface FilterFormProps {
    allMetaData?: IIntegrationMetadata[];
}

const FilterForm: React.FC<FilterFormProps> = ({ allMetaData }) => {
    const { clearFilters, saveFilters } = useFilters();
    const [openCard, setOpenCard] = useState<string | null>(null);

    const {
        statusesOptions,
        storageStatusesOptions,
        eventCategoriesOptions,
        timeCurrentPeriodOptions,
        instanceStatusEventCategoriesOptions,
    } = useOptions();

    const toggleCard = (cardId: string) => {
        setOpenCard((prev) => (prev === cardId ? null : cardId));
    };

    const testFunction = () => {
        allMetaData?.forEach((value: IIntegrationMetadata) => {
            console.log(
                'LIST TO CREATE?',
                value.integrationDisplayName,
                value.sourceApplicationIntegrationId
            );
        });
    };

    return (
        <Box minWidth={'300px'} className={'p-20'}>
            <VStack gap="4">
                <SortSelect />

                {/* Single Selection (Radio) */}
                <TimeCard
                    id="timeCard"
                    isOpen={openCard === 'timeCard'}
                    toggleOpen={toggleCard}
                    timeCurrentPeriodOptions={timeCurrentPeriodOptions}
                />

                {/* Multi Selection (Chips, Combobox) */}
                {/* TODO: name from intergrations API , display as dropdown combo  with search, use metadata for values : THE ID IS NOT THERE!!! */}
                <IntegrationCard
                    id="integration"
                    isOpen={openCard === 'integration'}
                    toggleOpen={toggleCard}
                    // integrationOptions={apiOptions.integrationOptions}
                    sourceApplicationIdsOptions={apiOptions.sourceApplicationIdsOptions}
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
                    {/*<Button onClick={testFunction}>Test</Button>*/}
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
