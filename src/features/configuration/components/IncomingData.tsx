import { FormatListNumbered } from '@mui/icons-material';
import { Box, Heading, HelpText, HStack, Select, Tooltip, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useValueConvertingRepository from '../../../shared/api/useValueConvertingRepository';
import { WarningTriangleIcon } from '../../../shared/components/icons';
import { ConfigurationContext } from '../context/ConfigurationContext';
import { IntegrationContext } from '../../../shared/context/IntegrationContext';
import { SourceApplicationContext } from '../../../shared/context/SourceApplicationContext';
import {
    toInstanceCollectionFieldReference,
    toInstanceFieldReference,
} from '../../../shared/util/JsonUtil';
import { IValueConverting } from '../../valueConverting/types/ValueConverting';
import {
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
} from '../types/Metadata/IntegrationMetadata';
import {
    extractCollectionFieldReferenceIndexAndKey,
    extractFieldReferenceKey,
    isCollectionFieldReference,
    isFieldReference,
} from '../util/FieldReferenceUtils';
import DraggableValueConvertingTag from './dnd/DraggableValueConvertingTag';
import MetadataContent from './metadata/MetadataContent';
import MetadataContentWrapper from './metadata/MetadataContentWrapper';

export type Props = {
    referencesForCollectionsToShow: string[];
};

const IncomingData: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });
    const ValueConvertingRepository = useValueConvertingRepository();
    const methods = useFormContext();
    const { completed } = useContext(ConfigurationContext);
    const { getInstanceElementMetadata, instanceElementMetadata, getAllMetadata, allMetadata } =
        useContext(SourceApplicationContext);
    const {
        existingIntegration,
        existingIntegrationMetadata,
        setExistingIntegrationMetadata,
        configuration,
    } = useContext(IntegrationContext);

    const [valueConvertings, setValueConvertings] = useState<IValueConverting[] | undefined>(
        undefined
    );

    const availableVersions = useMemo(
        () =>
            allMetadata
                ?.filter(
                    (md) =>
                        String(md.sourceApplicationId) ===
                            String(existingIntegration?.sourceApplicationId) &&
                        md.sourceApplicationIntegrationId ===
                            existingIntegration?.sourceApplicationIntegrationId
                )
                .sort((a, b) => a.version - b.version) ?? [],
        [
            allMetadata,
            existingIntegration?.sourceApplicationId,
            existingIntegration?.sourceApplicationIntegrationId,
        ]
    );

    const version = String(
        existingIntegrationMetadata?.version ??
            availableVersions.find(
                (md) => String(md.id) === String(configuration?.integrationMetadataId)
            )?.version ??
            ''
    );

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings({
            page: 0,
            size: 100,
            sortProperty: 'fromApplicationId',
            sortDirection: 'ASC',
            excludeConvertingMap: false,
        })
            .then((response) => {
                const data: IValueConverting[] = response.data.content;
                const convertings: IValueConverting[] = existingIntegration?.sourceApplicationId
                    ? data.filter(
                          (vc) =>
                              vc.fromApplicationId ===
                              Number(existingIntegration.sourceApplicationId)
                      )
                    : data;
                setValueConvertings(
                    convertings.sort((a, b) => a.displayName.localeCompare(b.displayName))!
                );
            })
            .catch((e) => {
                console.error(e);
                setValueConvertings([]);
            });
    }, []);

    useEffect(() => {
        if (!allMetadata?.length) {
            getAllMetadata();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const applySelectedMetadata = (metadata: (typeof availableVersions)[number]) => {
        setExistingIntegrationMetadata(metadata);
        methods.setValue('integrationMetadataId', Number(metadata.id));
        getInstanceElementMetadata(String(metadata.id));
    };

    useEffect(() => {
        if (existingIntegrationMetadata || availableVersions.length === 0) {
            return;
        }

        const metadata =
            availableVersions.find(
                (md) => String(md.id) === String(configuration?.integrationMetadataId)
            ) ?? availableVersions[availableVersions.length - 1];

        applySelectedMetadata(metadata);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        availableVersions,
        configuration?.integrationMetadataId,
        existingIntegrationMetadata,
    ]);

    function findInstanceObjectCollectionMetadata(
        metadataContent: IInstanceMetadataContent,
        key: string
    ): IInstanceObjectCollectionMetadata | undefined {
        const searchResultInCurrent: IInstanceObjectCollectionMetadata | undefined =
            metadataContent.instanceObjectCollectionMetadata.find(
                (instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata) =>
                    instanceObjectCollectionMetadata.key === key
            );
        if (searchResultInCurrent) {
            return searchResultInCurrent;
        }
        for (const category of metadataContent.categories) {
            const categorySearchResult: IInstanceObjectCollectionMetadata | undefined =
                findInstanceObjectCollectionMetadata(category.content, key);
            if (categorySearchResult) {
                return categorySearchResult;
            }
        }
        return undefined;
    }

    function getReferenceAndCollectionMetadata(
        references: string[]
    ): [string, IInstanceObjectCollectionMetadata][] {
        const referenceAndCollectionMetadata: [string, IInstanceObjectCollectionMetadata][] = [];
        references.forEach((reference: string) => {
            if (isFieldReference(reference)) {
                const key: string = extractFieldReferenceKey(reference);
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined =
                    instanceElementMetadata
                        ? findInstanceObjectCollectionMetadata(instanceElementMetadata, key)
                        : undefined;
                if (collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata]);
                }
            } else if (isCollectionFieldReference(reference)) {
                const [index, key]: [number, string] =
                    extractCollectionFieldReferenceIndexAndKey(reference);
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined =
                    findInstanceObjectCollectionMetadata(
                        referenceAndCollectionMetadata[index][1].objectMetadata,
                        key
                    );
                if (collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata]);
                }
            }
        });
        return referenceAndCollectionMetadata;
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = availableVersions.find(
            (metadata) => metadata.version === Number(event.target.value)
        );
        if (!selected) {
            return;
        }
        applySelectedMetadata(selected);
    };

    return (
        <Box
            style={{ minWidth: '400px' }}
            id={'incoming-form-panel'}
            className="incoming-form-panel"
            background={'surface-default'}
            paddingBlock={'4 0'}
        >
            <VStack gap={'2'}>
                <HStack align={'end'} justify={'space-between'}>
                    <HStack gap={'2'} align={'center'}>
                        <Heading level={'3'} size={'small'}>
                            {t('metadataPanel.header')}
                        </Heading>
                        <HelpText title={'Hva er dette?'} placement={'right'}>
                            {t('metadataPanel.help.metadata')}
                        </HelpText>
                    </HStack>
                    <HStack gap={'1'} align={'center'}>
                        {availableVersions.some((av) => av.version > Number(version)) && (
                            <Tooltip content={t('metadataPanel.metadataWarning')}>
                                <WarningTriangleIcon
                                    color={'orange'}
                                    title="a11y-title"
                                    fontSize="1.5rem"
                                />
                            </Tooltip>
                        )}
                        <Select
                            label={t('metadataPanel.version')}
                            style={{ borderColor: 'red' }}
                            hideLabel
                            size={'small'}
                            disabled={completed}
                            value={version}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleSelectChange(e);
                            }}
                        >
                            {availableVersions.map((md, index) => {
                                return (
                                    <option key={index} value={md.version}>
                                        {t('metadataPanel.version')} {md.version}
                                    </option>
                                );
                            })}
                        </Select>
                    </HStack>
                </HStack>
                {instanceElementMetadata && (
                    <MetadataContentWrapper
                        id={'metadata-content-panel'}
                        title={t('metadataPanel.metadata')}
                    >
                        <MetadataContent
                            content={instanceElementMetadata}
                            keyToReferenceFunction={(key: string) => toInstanceFieldReference(key)}
                        />
                    </MetadataContentWrapper>
                )}
                {props.referencesForCollectionsToShow.length > 0 &&
                    getReferenceAndCollectionMetadata(props.referencesForCollectionsToShow).map(
                        (
                            [reference, objectCollectionMetadata]: [
                                string,
                                IInstanceObjectCollectionMetadata,
                            ],
                            index: number
                        ) => (
                            <MetadataContentWrapper
                                key={'tagTreeCollectionValues-' + index}
                                id={'tagTreeCollectionValues-' + index}
                                title={objectCollectionMetadata.displayName}
                                description={reference}
                                icon={<FormatListNumbered />}
                                active={true}
                            >
                                <MetadataContent
                                    content={objectCollectionMetadata.objectMetadata}
                                    keyToReferenceFunction={(key: string) =>
                                        toInstanceCollectionFieldReference(index, key)
                                    }
                                />
                            </MetadataContentWrapper>
                        )
                    )}
                {valueConvertings && valueConvertings?.length > 0 && (
                    <MetadataContentWrapper
                        id={'value-converting-panel'}
                        title={t('metadataPanel.valueConverting')}
                    >
                        {valueConvertings.map(
                            (valueConverting: IValueConverting, index: number) => {
                                return (
                                    <DraggableValueConvertingTag
                                        key={'valueConvertingValue-' + index}
                                        valueConverting={valueConverting}
                                    />
                                );
                            }
                        )}
                    </MetadataContentWrapper>
                )}
            </VStack>
        </Box>
    );
};

export default IncomingData;
