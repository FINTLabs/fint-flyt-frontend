import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import {
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IIntegrationMetadata,
} from '../types/Metadata/IntegrationMetadata';
import {
    extractCollectionFieldReferenceIndexAndKey,
    extractFieldReferenceKey,
    isCollectionFieldReference,
    isFieldReference,
} from '../util/FieldReferenceUtils';
import MetadataContentComponent from './metadata/MetadataContentComponent';
import {
    toInstanceCollectionFieldReference,
    toInstanceFieldReference,
} from '../../../util/JsonUtil';
import DraggableValueConvertingTag from './common/dnd/DraggableValueConvertingTag';
import { IValueConverting } from '../../valueConverting/types/ValueConverting';
import { IntegrationContext } from '../../../context/IntegrationContext';
import { useFormContext } from 'react-hook-form';
import { ConfigurationContext } from '../../../context/ConfigurationContext';
import { Box, Heading, HelpText, HStack, Select, Tooltip, VStack } from '@navikt/ds-react';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import useValueConvertingRepository from '../../../api/useValueConvertingRepository';
import MetadataContentWrapper from './metadata/MetadataContentWrapper';
import { FormatListNumbered } from '@mui/icons-material';

export type Props = {
    referencesForCollectionsToShow: string[];
};

const IncomingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });
    const ValueConvertingRepository = useValueConvertingRepository();
    const methods = useFormContext();
    const { completed } = useContext(ConfigurationContext);
    const { getInstanceElementMetadata, instanceElementMetadata, getAllMetadata, allMetadata } =
        useContext(SourceApplicationContext);
    const { existingIntegration, existingIntegrationMetadata, setExistingIntegrationMetadata } =
        useContext(IntegrationContext);

    const [valueConvertings, setValueConvertings] = useState<IValueConverting[] | undefined>(
        undefined
    );
    const [version, setVersion] = React.useState<string>(
        existingIntegrationMetadata ? String(existingIntegrationMetadata.version) : ''
    );

    const availableVersions: IIntegrationMetadata[] = allMetadata
        ? allMetadata.filter((md) => {
              return (
                  md.sourceApplicationId === existingIntegrationMetadata?.sourceApplicationId &&
                  md.sourceApplicationIntegrationId ===
                      existingIntegrationMetadata.sourceApplicationIntegrationId
              );
          })
        : [];

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(0, 100, 'fromApplicationId', 'ASC', false)
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
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        setVersion(event.target.value);
        const version = Number(event.target.value);
        const integrationMetadata: IIntegrationMetadata[] = availableVersions.filter(
            (metadata) => metadata.version === version
        );
        setExistingIntegrationMetadata(integrationMetadata[0]);
        if (integrationMetadata[0].id) {
            methods.setValue('integrationMetadataId', Number(integrationMetadata[0].id));
            getInstanceElementMetadata(integrationMetadata[0].id);
        }
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
                                <ExclamationmarkTriangleFillIcon
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
                            defaultValue={version}
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
                        <MetadataContentComponent
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
                                <MetadataContentComponent
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

export default IncomingDataComponent;
