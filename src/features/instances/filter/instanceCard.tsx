import { Detail, ExpansionCard, TextField, VStack } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useFilters } from './FilterContext';
import { setCommaSeparatedValue } from './util';
import { useTranslation } from 'react-i18next';

interface Props {
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function InstanceCard(props: Props) {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.instanceCard',
    });
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

    const getExpansionCardDescription = (): React.ReactNode => {
        const details: React.ReactNode[] = [];

        const selectedDestinationSource = filters.destinationIds?.join(', ') ?? '';
        const selectedIntegrationSource = filters.sourceApplicationInstanceIds?.join(', ') ?? '';

        if (selectedIntegrationSource) {
            details.push(
                <Detail key="source">
                    {t('description.source', { value: selectedIntegrationSource })}
                </Detail>
            );
        }

        if (selectedDestinationSource) {
            details.push(
                <Detail key="destination">
                    {t('description.destination', { value: selectedDestinationSource })}
                </Detail>
            );
        }

        return details.length > 0 ? <>{details}</> : null; // ✅ Returns JSX elements or null
    };

    return (
        <ExpansionCard
            size="small"
            aria-label={t('ariaLabel') || 'default label'}
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    {t('title')}
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <TextField
                        label={t('fields.sourceAppInstanceId.label')}
                        size="small"
                        value={instanceInput}
                        onChange={handleInstanceChange}
                        onBlur={handleInstanceBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleInstanceBlur()}
                        placeholder={t('fields.sourceAppInstanceId.placeholder')}
                    />

                    <TextField
                        label={t('fields.destinationId.label')}
                        size="small"
                        value={destinationInput}
                        onChange={handleDestinationChange}
                        onBlur={handleDestinationBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleDestinationBlur()}
                        placeholder={t('fields.destinationId.placeholder')}
                    />
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
