import React, { FC, useCallback, useContext, useEffect } from 'react';
import { HStack, VStack } from '@navikt/ds-react';
import BulkActions from '../batchProcess/BulkActions';
import ActiveFilters from './ActiveFilters';
import { useFilterOptions } from './OptionsContext';
import FilterDropdownMenu from './filterMenu/FilterDropdownMenu';
import QuickFiltersDropdownMenu from './filterMenu/QuickFiltersDropdownMenu';
import useIntegrationRepository from '../../../api/useIntegrationRepository';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { AuthorizationContext } from '../../../context/AuthorizationContext';
import { sourceApplicationsToSelectable } from '../../../util/FormUtil';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import { IIntegration } from '../../integration/types/Integration';

const FilterToolbar: FC = () => {
    const IntegrationRepository = useIntegrationRepository();
    const { allMetadata } = useContext(SourceApplicationContext);
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const { setAllIntegrations, setSourceApplicationIdOptions } = useFilterOptions();

    const fetchSourceApplications = useCallback(() => {
        getAllSourceApplications(true).then((sourceApps) => {
            const options = sourceApplicationsToSelectable(sourceApps);
            setSourceApplicationIdOptions(options);
        });
    }, []);

    const fetchIntegrations = useCallback((metadata: IIntegrationMetadata[]) => {
        IntegrationRepository.getAllIntegrations()
            .then((response) => {
                const data = response.data;
                metadata?.forEach((meta) => {
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
    }, []);

    useEffect(() => {
        if (allMetadata) {
            fetchIntegrations(allMetadata);
            fetchSourceApplications();
        }
    }, [allMetadata]);

    return (
        <VStack gap={'4'} className={'filter-toolbar'}>
            <HStack gap={'8'} justify={'space-between'}>
                <HStack align={'center'} wrap={false}>
                    <FilterDropdownMenu />
                    <QuickFiltersDropdownMenu />
                </HStack>
                <BulkActions />
            </HStack>
            <ActiveFilters />
        </VStack>
    );
};

export default FilterToolbar;
