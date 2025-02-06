import { ExpansionCard, TextField, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useFilters } from './filterContext';
import { setCommaSeparatedValue } from './util';

interface Props {
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function InstanceCard({ id, isOpen, toggleOpen }: Props) {
    const { filters, updateFilter } = useFilters();

    const [instanceInput, setInstanceInput] = useState(
        filters.sourceApplicationInstanceIds?.join(', ') ?? ''
    );
    const [integrationInput, setIntegrationInput] = useState(
        filters.sourceApplicationIntegrationIds?.join(', ') ?? ''
    );

    const handleInstanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInstanceInput(e.target.value);
    };

    const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIntegrationInput(e.target.value);
    };

    const handleInstanceBlur = () => {
        setCommaSeparatedValue(updateFilter, 'sourceApplicationInstanceIds', instanceInput);
    };

    const handleIntegrationBlur = () => {
        setCommaSeparatedValue(updateFilter, 'sourceApplicationIntegrationIds', integrationInput);
    };

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];

        const selectedInstanceSource = filters.sourceApplicationInstanceIds?.join(', ') ?? '';
        const selectedIntegrationSource = filters.sourceApplicationIntegrationIds?.join(', ') ?? '';

        if (selectedInstanceSource) {
            parts.push(`Kilde: ${selectedInstanceSource}`);
        }
        if (selectedIntegrationSource) {
            parts.push(`Destinasjon: ${selectedIntegrationSource}`);
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Instans-variant"
            open={isOpen}
            onToggle={() => toggleOpen(id)}>
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
                        label="Destinasjons instans-ID"
                        size="small"
                        value={integrationInput}
                        onChange={handleIntegrationChange}
                        onBlur={handleIntegrationBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleIntegrationBlur()}
                        placeholder="Skriv inn destinasjons-ID-er, separert med komma"
                    />
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
