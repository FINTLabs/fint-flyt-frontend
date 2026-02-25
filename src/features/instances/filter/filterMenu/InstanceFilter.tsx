import { useFilters } from '../FilterContext';
import { useTranslation } from 'react-i18next';
import { TextField, VStack } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { setCommaSeparatedValue } from '../util';

export default function InstanceFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.instanceCard',
    });
    const { updateFilter, filters } = useFilters();

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

    return (
        <VStack gap="4" padding={'2'}>
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
    );
}
