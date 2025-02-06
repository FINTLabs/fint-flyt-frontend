import React, { useState } from 'react';
import { Box, Button, HStack, VStack } from '@navikt/ds-react';
import SortSelect from './sortSelect';
import TimeCard from './timeCard';
import IntegrationCard from './integrationCard';
import InstanceCard from './instanceCard';
import StatusCard from './statusCard';
import AdvancedCard from './advancedCard';
import { FilterProvider, useFilters } from './filterContext';

const apiOptions = {
    sourceApplicationIdsOptions: [
        { value: '1', label: 'Digisak' },
        { value: '2', label: 'eGrunnerverv' },
    ],
    integrationOptions: [
        // integrationIds
        { value: '1', label: 'Fartøyvern' },
        { value: '2', label: 'Arkivsak' },
        {
            value: '3',
            label: 'Tillatelse til inngrep i automatisk fredet kulturminne for enkelttiltak',
        },
        { value: '4', label: 'Journalpost' },
        { value: '5', label: 'Tilskudd til freda bygninger i privat eie' },
    ],
    statusesOptions: [
        { value: '1', label: 'Under behandling' },
        { value: '2', label: 'Overført' },
        { value: '3', label: 'Avvist' },
        { value: '4', label: 'Feilet' },
    ],
    associatedEventNamesOptions: [
        { value: '1', label: 'Mellomlagring av instans slettet' },
        { value: '2', label: 'Instans klar for sending til destinasjon' },
        { value: '3', label: 'Instans konvertert' },
    ],
    storageStatusesOptions: [
        { value: '1', label: 'Lagret' },
        { value: '2', label: 'Lagret og slettet' },
        { value: '3', label: 'Ikke lagret' },
    ],
    timeCurrentPeriodOptions: [
        { value: '1', label: 'Time' },
        { value: '2', label: 'Tre timer' },
        { value: '3', label: 'Døgn' },
        { value: '4', label: 'Uke' },
        { value: '5', label: 'Måned' },
        { value: '6', label: 'År' },
    ],

    instanceSourceOptions: [
        { id: '1', name: '208812' },
        { id: '2', name: 'GIMSE-X' },
        { id: '3', name: 'GIMSE-1337' },
    ],
    destinationSourceOptions: [
        { id: '1', name: '2024/77-[27]' },
        { id: '2', name: '2024/77-[25]' },
        { id: '3', name: '2024/77-[24]' },
    ],

    connectedEventsOptions: [
        { id: '1', name: 'Avansert 1' },
        { id: '2', name: 'Avansert 2' },
        { id: '3', name: 'Avansert 3' },
    ],
};

const FilterForm: React.FC = () => {
    const { clearFilters, printFilters } = useFilters();
    const [openCard, setOpenCard] = useState<string | null>(null);

    const toggleCard = (cardId: string) => {
        console.log('toggling card: ', cardId);
        setOpenCard((prev) => (prev === cardId ? null : cardId));
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
                    timeCurrentPeriodOptions={apiOptions.timeCurrentPeriodOptions}
                />

                {/* Multi Selection (Chips, Combobox) */}
                <IntegrationCard
                    id="integration"
                    isOpen={openCard === 'integration'}
                    toggleOpen={toggleCard}
                    integrationOptions={apiOptions.integrationOptions}
                    sourceApplicationIdsOptions={apiOptions.sourceApplicationIdsOptions}
                />

                {/* Comma-separated Text Inputs */}
                <InstanceCard
                    id="instance"
                    isOpen={openCard === 'instance'}
                    toggleOpen={toggleCard}
                />

                {/* Multi Selection (Chips) */}
                {/*<StatusCard*/}
                {/*    id="status"*/}
                {/*    isOpen={openCard === 'status'}*/}
                {/*    toggleOpen={toggleCard}*/}
                {/*    associatedEventNamesOptions={apiOptions.associatedEventNamesOptions}*/}
                {/*    statusesOptions={apiOptions.statusesOptions}*/}
                {/*/>*/}

                {/* Multi Selection (Chips + Combobox) */}
                <AdvancedCard
                    id="advanced"
                    isOpen={openCard === 'advanced'}
                    toggleOpen={toggleCard}
                    associatedEventNamesOptions={apiOptions.associatedEventNamesOptions}
                    storageStatusesOptions={apiOptions.storageStatusesOptions}
                />

                <HStack gap={'10'}>
                    <Button onClick={printFilters}>Søk</Button>
                    <Button variant={'tertiary'} onClick={clearFilters}>
                        Tilbakestill
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default function Filters() {
    return (
        <FilterProvider>
            <FilterForm />
        </FilterProvider>
    );
}
