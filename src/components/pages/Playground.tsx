import React from 'react';
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from "react-dnd";
import BaseField from "../../features/configuration/components/common/custom/BaseField";
import {Tag, TagProps} from "../../features/configuration/components/common/custom/Tag";
import {ValueType} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import {Box, Heading, HStack, VStack} from "@navikt/ds-react";
import ToolsComponent from "../../features/configuration/components/tools/ToolsComponent";

const Playground: RouteComponent = () => {
    const baseFields: {name: string, outputField: ValueType}[] = [
        {name: "Tittel", outputField: ValueType.STRING},
        {name: "Offentlig tittel", outputField: ValueType.STRING},
        {name: "Navn", outputField: ValueType.STRING},
        {name: "Saksansvarlig", outputField: ValueType.STRING}
    ]
    const metadatas: TagProps[] = [
        {name: 'Fornavn [fornavn]', type: ValueType.METADATA},
        {name: 'Etternavn [etternavn]', type: ValueType.METADATA},
        {name: 'Adresse [adresse]', type: ValueType.METADATA},
        {name: 'Postnummer [postnr]', type: ValueType.METADATA},
        {name: 'Kommunenr [knr]', type: ValueType.METADATA},
        {name: 'Gårdsnr [gnr]', type: ValueType.METADATA},
        {name: 'Bruksnr [bnr]', type: ValueType.METADATA},
        {name: 'Kommunenavn [postnr]', type: ValueType.METADATA},
        {name: 'Prosjektnavn [prosjektnavn]', type: ValueType.METADATA},
        {name: 'Saksansvarlig [saksanvarlig]', type: ValueType.METADATA}
    ]
    const valueConvertings: TagProps[] = [
        {
            name: 'til store bokstaver VC[1]', type: ValueType.VALUE_CONVERTING, collection: false, requiredFields: [
                {
                    outputType: ValueType.STRING,
                    accept: [ValueType.STRING, ValueType.METADATA, ValueType.VALUE_CONVERTING]
                }
            ]
        },
        {
            name: 'krever en alfanr. og et heltall VC[2]',
            type: ValueType.VALUE_CONVERTING,
            collection: false,
            requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.INTEGER]},
                {outputType: ValueType.INTEGER, accept: [ValueType.INTEGER]}
            ]
        },
        {
            name: 'krever en alfanr. og en metadata VC[3]',
            type: ValueType.VALUE_CONVERTING,
            collection: false,
            requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING]},
                {outputType: ValueType.METADATA, accept: [ValueType.METADATA]}]
        },
        {
            name: 'slå sammen tekst VC[4]', type: ValueType.VALUE_CONVERTING, collection: true, requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.METADATA]}]
        }

    ]

    return (
        <DndProvider backend={HTML5Backend}>
            <PageTemplate id={'version'} keyPrefix={'pages'} customHeading>
                <HStack gap={"6"} wrap={false}>
                    <VStack gap={"6"}>
                        <VStack gap={"2"} style={{backgroundColor: 'lightblue', padding: '10px', border: '2px solid dimgray'}}>
                            <Heading size={"xsmall"}>Metadata</Heading>
                            {metadatas.map(({name, type, collection, requiredFields}, index) => (
                                <Tag
                                    name={name}
                                    type={type}
                                    collection={collection}
                                    requiredFields={requiredFields}
                                    key={index}
                                />
                            ))}
                        </VStack>
                        <Box style={{width: '400px', backgroundColor: 'lightgray', padding: '10px', border: '2px solid dimgray'}}>
                            <ToolsComponent displayName={"Verktøy"} content={[]}/>
                        </Box>
                        <VStack gap={"2"} style={{backgroundColor: 'lightyellow', padding: '10px', border: '2px solid dimgray'}}>
                            <Heading size={"xsmall"}>Verdikonvertering</Heading>
                            {valueConvertings.map(({name, type, collection, requiredFields}, index) => (
                                <Tag
                                    name={name}
                                    type={type}
                                    collection={collection}
                                    requiredFields={requiredFields}
                                    key={index}
                                />
                            ))}
                        </VStack>
                    </VStack>

                    <VStack gap={"4"}>
                        {baseFields.map((baseField, index) =>
                            <BaseField key={index}
                                       topComponent
                                       outputType={baseField.outputField}
                                       accept={[ValueType.STRING, ValueType.INTEGER, ValueType.DOUBLE, ValueType.VALUE_CONVERTING, ValueType.METADATA]}
                                       value={null}
                                       name={baseField.name}
                                       fieldState={undefined}
                            />
                        )}
                    </VStack>
                </HStack>
            </PageTemplate>
        </DndProvider>

    );
}
export default Playground;