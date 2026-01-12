import React, { useEffect, useState, useMemo, useCallback, useRef, useContext } from 'react';
import { Box, Button, Modal, Tag, Tooltip, VStack } from '@navikt/ds-react';
import TimeCard from './timeCard';
import IntegrationCard from './integrationCard';
import InstanceCard from './instanceCard';
import StatusCard from './statusCard';
import AdvancedCard from './advancedCard';
import { useFilters } from './FilterContext';
import { OptionsProvider, useOptions } from './OptionsContext';
import { IIntegration } from '../../integration/types/Integration';
import useIntegrationRepository from '../../../api/useIntegrationRepository';
import { FilterIcon } from '@navikt/aksel-icons';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { useTranslation } from 'react-i18next';

const apiOptions = {
    sourceApplicationIdsOptions: [
        { value: '1', label: 'ACOS Interact' },
        { value: '2', label: 'eGrunnerverv' },
        { value: '3', label: 'Digisak' },
        { value: '4', label: 'VIGO' },
        { value: '5', label: 'Altinn' },
        { value: '6', label: 'HMSReg' },
        { value: '7', label: 'ISY Graving' }
    ],
};

const FilterForm: React.FC = () => {
    const IntegrationRepository = useIntegrationRepository();
    const { allMetadata } = useContext(SourceApplicationContext);
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });

    const { clearFilters, saveFilters, filters, updateFilter } = useFilters();
    const [openCard, setOpenCard] = useState<string | null>(null);
    const [allIntegrations, setAllIntegrations] = useState<IIntegration[]>([]);
    const ref = useRef<HTMLDialogElement>(null);
    const [filterCount, setFilterCount] = useState(0);

    const {
        statusesOptions,
        storageStatusesOptions,
        eventCategoriesOptions,
        timeCurrentPeriodOptions,
        instanceStatusEventCategoriesOptions,
    } = useOptions();

    useEffect(() => {
        if (filters) {
            setFilterCount(
                Object.entries(filters).filter(([, value]) => value != null && value.length > 0)
                    .length
            );
        }
    }, []);

    useEffect(() => {
        IntegrationRepository.getAllIntegrations()
            .then((response) => {
                const data = response.data;
                allMetadata?.forEach((meta) => {
                    const integration = data.find(
                        (i: IIntegration) =>
                            i.sourceApplicationIntegrationId === meta.sourceApplicationIntegrationId
                    );
                    if (integration) {
                        integration.displayName = meta.integrationDisplayName;
                    }
                });
                setAllIntegrations(data);
            })
            .catch(console.error);
    }, [allMetadata]);

    const sourceApplicationIntegrationOptions = useMemo<{ label: string; value: string }[]>(() => {
        return allIntegrations
            .filter(
                (integration) =>
                    !!integration.sourceApplicationIntegrationId &&
                    (!filters.sourceApplicationIds?.length ||
                        filters.sourceApplicationIds.includes(
                            integration.sourceApplicationId?.toString() ?? ''
                        ))
            )
            .map((integration) => ({
                label: integration.sourceApplicationIntegrationId
                    ? integration.sourceApplicationIntegrationId
                    : '',
                value: integration.sourceApplicationIntegrationId
                    ? integration.sourceApplicationIntegrationId
                    : '',
            }))
            .filter(
                (option, index, self) => self.findIndex((o) => o.value === option.value) === index
            )
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
            const validIds = sourceApplicationIntegrationOptions.map((opt) => opt.value);
            const filtered = filters.sourceApplicationIntegrationIds.filter((id) =>
                validIds.includes(id)
            );
            if (filtered.length !== filters.sourceApplicationIntegrationIds.length) {
                updateFilter('sourceApplicationIntegrationIds', filtered);
            }
        }
    }, [
        filters.sourceApplicationIds,
        sourceApplicationIntegrationOptions,
        filters.sourceApplicationIntegrationIds,
        updateFilter,
    ]);

    const toggleCard = useCallback((cardId: string) => {
        setOpenCard((prev) => (prev === cardId ? null : cardId));
    }, []);

    const handleSaveFilter = useCallback(() => {
        setFilterCount(
            Object.entries(filters).filter(([, value]) => value != null && value.length > 0).length
        );
        saveFilters();
    }, [saveFilters]);

    const handleClearFilters = useCallback(() => {
        setFilterCount(0);
        clearFilters();
    }, [clearFilters]);

    return (
        <Box>
            <Box style={{ position: 'relative', display: 'inline-block' }}>
                {allMetadata && filterCount > 0 && (
                    <Tooltip content={t('filter.alerts.tableFiltered')} placement={'right'}>
                        <Box
                            style={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                            }}
                        >
                            <Tag variant="alt3-filled" size="small" aria-hidden>
                                {filterCount}
                            </Tag>
                        </Box>
                    </Tooltip>
                )}
                <Button
                    type="button"
                    data-testid={'filters-form-button'}
                    className={allMetadata && filterCount ? 'toggled' : ''}
                    variant={'secondary'}
                    icon={<FilterIcon aria-hidden />}
                    onClick={() => ref.current?.showModal()}
                    disabled={!allMetadata}
                >
                    Filtrer tabellen
                </Button>
            </Box>
            <Modal
                ref={ref}
                onClose={() => ref.current?.close()}
                header={{ heading: 'Søkefiltre' }}
            >
                {allMetadata && (
                    <Modal.Body>
                        <Box
                            paddingInline={'4'}
                            minWidth={'300px'}
                            className={'p-20'}
                            data-testid="filters-form"
                        >
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
                                    sourceApplicationIdsOptions={
                                        apiOptions.sourceApplicationIdsOptions
                                    }
                                    sourceApplicationIntegrationOptions={
                                        sourceApplicationIntegrationOptions
                                    }
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
                                    associatedEventNamesOptions={
                                        instanceStatusEventCategoriesOptions
                                    }
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
                            </VStack>
                        </Box>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            handleClearFilters();
                            ref.current?.close();
                        }}
                    >
                        Tilbakestill
                    </Button>
                    <Button
                        onClick={() => {
                            handleSaveFilter();
                            ref.current?.close();
                        }}
                    >
                        Søk
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default function Filters() {
    return (
        <OptionsProvider>
            <FilterForm />
        </OptionsProvider>
    );
}
