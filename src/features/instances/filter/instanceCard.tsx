import { ExpansionCard, TextField, VStack } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useFilters } from './FilterContext';
import { setCommaSeparatedValue } from './util';

interface Props {
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function InstanceCard(props: Props) {
    const { filters, updateFilter } = useFilters();

    const [instanceInput, setInstanceInput] = useState(
        filters.sourceApplicationInstanceIds?.join(', ') ?? ''
    );
    const [destinationInput, setDestinationInput] = useState(
        filters.destinationIds?.join(', ') ?? ''
    );

    useEffect(() => {
        setInstanceInput(filters.sourceApplicationInstanceIds?.join(', ') ?? '');
        setDestinationInput(filters.destinationIds?.join(', ') ?? '');
    }, [filters]);

    const handleInstanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstanceInput(e.target.value);
    };

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationInput(e.target.value);
    };

    const handleInstanceBlur = () => {
        setCommaSeparatedValue(updateFilter, 'sourceApplicationInstanceIds', instanceInput);
    };

    const handleDestinationBlur = () => {
        setCommaSeparatedValue(updateFilter, 'destinationIds', destinationInput);
    };

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];

        const selectedDestinationSource = filters.destinationIds?.join(', ') ?? '';
        const selectedIntegrationSource = filters.sourceApplicationInstanceIds?.join(', ') ?? '';

        if (selectedDestinationSource) {
            parts.push(`Kilde: ${selectedIntegrationSource}`);
        }
        if (selectedIntegrationSource) {
            parts.push(`Destinasjon: ${selectedDestinationSource}`);
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Instans-variant"
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    Instans
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <TextField
                        label="Kildeapplikasjons instans-ID"
                        size="small"
                        value={instanceInput}
                        onChange={handleInstanceChange}
                        onBlur={handleInstanceBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleInstanceBlur()}
                        placeholder="Skriv inn kilde-ID-er, separert med komma"
                    />

                    <TextField
                        label="Destinasjons"
                        size="small"
                        value={destinationInput}
                        onChange={handleDestinationChange}
                        onBlur={handleDestinationBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleDestinationBlur()}
                        placeholder="Skriv inn destinasjons-ID-er, separert med komma"
                    />
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
