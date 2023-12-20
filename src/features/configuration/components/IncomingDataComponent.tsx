import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/SourceApplicationContext";
import {
	IInstanceMetadataContent,
	IInstanceObjectCollectionMetadata,
	IIntegrationMetadata,
	ValueType,
} from "../types/Metadata/IntegrationMetadata";
import {
	extractCollectionFieldReferenceIndexAndKey,
	extractFieldReferenceKey,
	isCollectionFieldReference,
	isFieldReference,
} from "../util/FieldReferenceUtils";
import MetadataContentComponent from "./metadata/MetadataContentComponent";
import {toInstanceFieldReference} from "../../../util/JsonUtil";
import ObjectCollectionMetadataContentComponent from "./metadata/ObjectCollectionMetadataContentComponent";
import ValueConvertingRepository from "../../../api/ValueConvertingRepository";
import {Tag} from "./common/dnd/Tag";
import {IValueConverting} from "../../valueConverting/types/ValueConverting";
import {IntegrationContext} from "../../../context/IntegrationContext";
import {useFormContext} from "react-hook-form";
import {ConfigurationContext} from "../../../context/ConfigurationContext";
import {Heading, HStack, Tooltip, Box, VStack, Select, HelpText} from "@navikt/ds-react";
import {ExclamationmarkTriangleFillIcon} from '@navikt/aksel-icons';
import {ConfigurationFormStyles} from "../../../util/styles/ConfigurationFormStyles";

export type Props = {
    referencesForCollectionsToShow: string[];
};

const useStyles = ConfigurationFormStyles

const IncomingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation("translations", {keyPrefix: "pages.configuration.metadataPanel"});
    const {
        getInstanceElementMetadata,
        instanceElementMetadata,
        getAllMetadata,
        allMetadata
    } = useContext(SourceApplicationContext)
    const {
        completed
    } = useContext(ConfigurationContext)
    const {selectedMetadata, setSelectedMetadata,} = useContext(IntegrationContext)
    const [valueConvertings, setValueConvertings] = useState<[] | undefined>(undefined);
    const [version, setVersion] = React.useState<string>(selectedMetadata ? String(selectedMetadata.version) : '')
    const styles = useStyles();

    const availableVersions: IIntegrationMetadata[] = allMetadata ? allMetadata.filter(md => {
        return md.sourceApplicationId === selectedMetadata?.sourceApplicationId &&
            md.sourceApplicationIntegrationId === selectedMetadata.sourceApplicationIntegrationId
    }) : []


    const methods = useFormContext();

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(
            0,
            100,
            "fromApplicationId",
            "ASC",
            false
        )
            .then((response) => {
                setValueConvertings(response.data.content);
            })
            .catch((e) => {
                console.log(e);
                setValueConvertings([]);
            });
    }, []);

    useEffect(() => {
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            const categorySearchResult:
                | IInstanceObjectCollectionMetadata
                | undefined = findInstanceObjectCollectionMetadata(
                category.content,
                key
            );
            if (categorySearchResult) {
                return categorySearchResult;
            }
        }
        return undefined;
    }

    function getReferenceAndCollectionMetadata(
        references: string[]
    ): [string, IInstanceObjectCollectionMetadata][] {
        const referenceAndCollectionMetadata: [
            string,
            IInstanceObjectCollectionMetadata
        ][] = [];
        references.forEach((reference: string) => {
            if (isFieldReference(reference)) {
                const key: string = extractFieldReferenceKey(reference);
                const collectionMetadata:
                    | IInstanceObjectCollectionMetadata
                    | undefined = instanceElementMetadata
                    ? findInstanceObjectCollectionMetadata(instanceElementMetadata, key)
                    : undefined;
                if (collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata]);
                }
            } else if (isCollectionFieldReference(reference)) {
                const [index, key]: [number, string] =
                    extractCollectionFieldReferenceIndexAndKey(reference);
                const collectionMetadata:
                    | IInstanceObjectCollectionMetadata
                    | undefined = findInstanceObjectCollectionMetadata(
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

    return (
            <Box style={{minWidth: '400px', maxHeight: '70vh', overflow: "auto"}} id={"incoming-form-panel"} background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
                <VStack gap={"2"}>
                <HStack align={"center"} justify={"space-between"}>
                    <HStack gap={"2"} align={"center"}>
                        <Heading size={"small"}>{t("header")}</Heading>
                        <HelpText title={"Hva er dette?"} placement={"right"}>{t('help.metadata')}</HelpText>
                    </HStack>
                    <HStack gap={"1"} align={"center"}>
                            {availableVersions.some(av => av.version > Number(version)) &&
                                <Tooltip content={t('metadataWarning')}>
                                    <ExclamationmarkTriangleFillIcon color={"orange"} title="a11y-title" fontSize="1.5rem"/>
                                </Tooltip>
                            }
                            <Select
                                label={t('version')}
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
                                        value={md.version}>{t('version')} {md.version}
                                    </option>
                                })}
                            </Select>
                    </HStack>
                </HStack>
                <VStack gap={"4"}>
                    {instanceElementMetadata && (
                        <Box id={"metadata-content-panel"} background={"surface-subtle"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
                            <MetadataContentComponent
                                content={instanceElementMetadata}
                                keyToReferenceFunction={(key: string) =>
                                    toInstanceFieldReference(key)
                                }
                            />
                        </Box>
                    )}
                    {props.referencesForCollectionsToShow.length > 0 &&
                        getReferenceAndCollectionMetadata(
                            props.referencesForCollectionsToShow
                        ).map(
                            (
                                [reference, objectCollectionMetadata]: [
                                    string,
                                    IInstanceObjectCollectionMetadata
                                ],
                                index: number
                            ) => (
                                <Box
                                    key={"tagTreeCollectionValues-" + index}
                                    background={"surface-alt-3-subtle"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}
                                >
                                    <ObjectCollectionMetadataContentComponent
                                        collectionIndex={index}
                                        reference={reference}
                                        objectCollectionMetadata={objectCollectionMetadata}
                                    />
                                </Box>
                            )
                        )}
                    {valueConvertings && (
                        <Box id={"value-converting-panel"} background={"surface-subtle"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
                            <Heading size={"small"}>{t('valueConverting')}</Heading>
                            {valueConvertings.map(
                                (valueConverting: IValueConverting, index: number) => {
                                    return (
                                        <div
                                            id={"vc-tag-" + index}
                                            key={"valueConvertingValue-" + index}
                                            className={styles.tagWrapper}
                                        >
                                            <Tag
                                                value={"$vc{" + valueConverting.id.toString() + "}"}
                                                tagKey={valueConverting.displayName}
                                                name={valueConverting.displayName}
                                                description={"$vc{" + valueConverting.id.toString() + "}"}
                                                type={ValueType.VALUE_CONVERTING}
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </Box>
                    )}
                </VStack>
                </VStack>
            </Box>
    );
};

export default IncomingDataComponent;
