import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/SourceApplicationContext";
import {
	IInstanceMetadataContent,
	IInstanceObjectCollectionMetadata,
	ValueType,
	IIntegrationMetadata,
} from "../types/Metadata/IntegrationMetadata";
import {
    extractCollectionFieldReferenceIndexAndKey,
    extractFieldReferenceKey,
    isCollectionFieldReference,
    isFieldReference
} from "../util/FieldReferenceUtils";
import MetadataContentComponent from "./metadata/MetadataContentComponent";
import {toInstanceFieldReference} from "../../../util/JsonUtil";
import ObjectCollectionMetadataContentComponent from "./metadata/ObjectCollectionMetadataContentComponent";
import {Tag} from "./common/dnd/Tag";
import {IValueConverting} from "../../valueConverting/types/ValueConverting";
import {IntegrationContext} from "../../../context/IntegrationContext";
import {useFormContext} from "react-hook-form";
import {ConfigurationContext} from "../../../context/ConfigurationContext";
import {Heading, HStack, VStack, Tooltip, Box, ReadMore, Select, HelpText} from "@navikt/ds-react";
import {ExclamationmarkTriangleFillIcon} from '@navikt/aksel-icons';
import ValueConvertingRepository from "../../../api/ValueConvertingRepository";

export type Props = {
    referencesForCollectionsToShow: string[]
}

const IncomingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const {getInstanceElementMetadata, instanceElementMetadata, getAllMetadata, allMetadata} = useContext(SourceApplicationContext)
    const [valueConvertings, setValueConvertings] = useState<[] | undefined>(undefined)
    const [applicationValueConvertings, setApplicationValueConvertings] = useState<IValueConverting[] | undefined>(undefined)
    const [destinationValueConvertings, setDestinationValueConvertings] = useState<IValueConverting[] | undefined>(undefined)
    const {completed} = useContext(ConfigurationContext)
    const {selectedMetadata, setSelectedMetadata,} = useContext(IntegrationContext)
    const [version, setVersion] = React.useState<string>(selectedMetadata ? String(selectedMetadata.version) : '')
    const methods = useFormContext();

    const availableVersions: IIntegrationMetadata[] = allMetadata ? allMetadata.filter(md => {
        return md.sourceApplicationId === selectedMetadata?.sourceApplicationId &&
            md.sourceApplicationIntegrationId === selectedMetadata.sourceApplicationIntegrationId
    }) : []

	useEffect(() => {
		ValueConvertingRepository.getValueConvertings(0, 100, 'fromApplicationId', 'ASC', false)
			.then(response => {
				setValueConvertings(response.data.content)
			})
			.catch(e => {
				console.log(e)
				setValueConvertings([])
				setDestinationValueConvertings([])
				setApplicationValueConvertings([])
			})
	}, [])

	useEffect(() => {
		getAllMetadata(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    useEffect(() => {
        getAllMetadata(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function findInstanceObjectCollectionMetadata(metadataContent: IInstanceMetadataContent, key: string): IInstanceObjectCollectionMetadata | undefined {
        const searchResultInCurrent: IInstanceObjectCollectionMetadata | undefined =
            metadataContent.instanceObjectCollectionMetadata
                .find((instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata) =>
                    instanceObjectCollectionMetadata.key === key
                )
        if (searchResultInCurrent) {
            return searchResultInCurrent;
        }
        for (const category of metadataContent.categories) {
            const categorySearchResult: IInstanceObjectCollectionMetadata | undefined =
                findInstanceObjectCollectionMetadata(category.content, key)
            if (categorySearchResult) {
                return categorySearchResult;
            }
        }
        return undefined;
    }

    function getReferenceAndCollectionMetadata(references: string[]): [string, IInstanceObjectCollectionMetadata][] {
        const referenceAndCollectionMetadata: [string, IInstanceObjectCollectionMetadata][] = []
        references.forEach((reference: string) => {

            if (isFieldReference(reference)) {
                const key: string = extractFieldReferenceKey(reference)
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined = instanceElementMetadata
                    ? findInstanceObjectCollectionMetadata(instanceElementMetadata, key)
                    : undefined;
                if (collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata])
                }
            } else if (isCollectionFieldReference(reference)) {
                const [index, key]: [number, string] = extractCollectionFieldReferenceIndexAndKey(reference);
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined =
                    findInstanceObjectCollectionMetadata(referenceAndCollectionMetadata[index][1].objectMetadata, key)
                if (collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata])
                }
            }
        })
        return referenceAndCollectionMetadata;
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVersion(event.target.value);
        const version = Number(event.target.value)
        const integrationMetadata: IIntegrationMetadata[] = availableVersions
            .filter(metadata => metadata.version === version)
        setSelectedMetadata(integrationMetadata[0])
        if (integrationMetadata[0].id) {
            methods.setValue('integrationMetadataId', Number(integrationMetadata[0].id))
            getInstanceElementMetadata(integrationMetadata[0].id)
        }
    }

	const ValueConvertings = ({valueConverting}: { valueConverting: IValueConverting }) => {
		return <Tag
			value={'$vc{' + valueConverting.id.toString() + '}'}
			tagKey={valueConverting.displayName}
			name={valueConverting.displayName}
			description={'$vc{' + valueConverting.id.toString() + '}'}
			type={ValueType.VALUE_CONVERTING}
		/>
	}

    return (
		<Box style={{minWidth: '400px', maxHeight: '70vh', overflow: "auto"}} id={"incoming-form-panel"} background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
			<VStack gap={"2"}>
				<HStack align={"center"} justify={"space-between"}>
					<HStack gap={"2"} align={"center"}>
						<Heading size={"small"}>{t("header")}</Heading>
						<HelpText title={"Hva er dette?"} placement={"right"}>{t('metadataPanel.help.metadata')}</HelpText>
					</HStack>
					<HStack gap={"1"} align={"center"}>
						{availableVersions.some(av => av.version > Number(version)) &&
							<Tooltip content={t('metadataPanel.metadataWarning')}>
								<ExclamationmarkTriangleFillIcon color={"orange"} title="a11y-title" fontSize="1.5rem"/>
							</Tooltip>
						}
						<Select
							label={t('metadataPanel.version')}
							style={{borderColor: 'red'}}
							hideLabel
							size={"small"}
							disabled={completed}
							defaultValue={version}
							onChange={((e: React.ChangeEvent<HTMLSelectElement>) => {
								handleSelectChange(e)
								console.log(e.target.value)
							})}>
							{availableVersions.map((md, index) => {
								return <option
									key={index}
									value={md.version}>{t('metadataPanel.version')} {md.version}
								</option>
							})}
						</Select>
					</HStack>
				</HStack>
				<VStack gap={"4"}>
                {instanceElementMetadata &&
					<Box id={"metadata-content-panel"} background={"surface-subtle"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
                        <MetadataContentComponent
                            content={instanceElementMetadata}
                            keyToReferenceFunction={(key: string) => toInstanceFieldReference(key)}
                        />
                    </Box>
                }
                {props.referencesForCollectionsToShow.length > 0 &&
                    getReferenceAndCollectionMetadata(props.referencesForCollectionsToShow)
                        .map(([reference, objectCollectionMetadata]: [string, IInstanceObjectCollectionMetadata], index: number) =>
                            <Box
                                key={'tagTreeCollectionValues-' + index}
								background={"surface-alt-3-subtle"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}
                            >
                                <ObjectCollectionMetadataContentComponent
                                    collectionIndex={index}
                                    reference={reference}
                                    objectCollectionMetadata={objectCollectionMetadata}
                                />
                            </Box>
                        )
                }

					<Box id={"value-converting-panel"} background={"surface-subtle"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
						<Heading size={"small"}>{t('metadataPanel.valueConverting')}</Heading>
                    <ReadMore defaultOpen header={t('valueConverting.custom') + " [" + (valueConvertings?.length ?? 0) + ']'}>
                        <VStack gap={"2"} style={{maxHeight: '200px', overflowY: "scroll"}}>
                            {valueConvertings && valueConvertings.map((valueConverting: IValueConverting, index: number) => {
                                return <ValueConvertings key={'valueConvertingValue-' + index}
                                                         valueConverting={valueConverting}/>
                            })}
                        </VStack>
                    </ReadMore>
                    <ReadMore header={t('valueConverting.application') + " [" + (applicationValueConvertings?.length ?? 0) + ']'}>
                        <VStack gap={"2"}>
                            {applicationValueConvertings && applicationValueConvertings.map((valueConverting: IValueConverting, index: number) => {
                                return <ValueConvertings key={'valueConvertingValue-' + index}
                                                         valueConverting={valueConverting}/>
                            })}
                        </VStack>
                    </ReadMore>
                    <ReadMore header={t('valueConverting.destination') + " [" + (destinationValueConvertings?.length ?? 0) + ']'}>
                        <VStack gap={"2"}>
                            {destinationValueConvertings && destinationValueConvertings.map((valueConverting: IValueConverting, index: number) => {
                                return <ValueConvertings key={'valueConvertingValue-' + index}
                                                         valueConverting={valueConverting}/>
                            })}
                        </VStack>
                    </ReadMore>
                </Box>
				</VStack>
				</VStack>
            </Box>
    );
}

export default IncomingDataComponent;
