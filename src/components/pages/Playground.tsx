import React, {useState} from 'react';
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from "react-dnd";
import BaseField from "../../features/configuration/components/common/custom/BaseField";
import {Tag, TagProps} from "../../features/configuration/components/common/custom/Tag";
import {ValueType} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import {Box, Heading, HStack, VStack} from "@navikt/ds-react";
import ToolsComponent from "../../features/configuration/components/tools/ToolsComponent";
import {Controller, FormProvider, useForm} from "react-hook-form";


const Playground: RouteComponent = () => {
    const metadatas: TagProps[] = [
        {name: 'Fornavn', type: ValueType.METADATA, referenceValue: "fornavn"},
        {name: 'Etternavn', type: ValueType.METADATA, referenceValue: "etternavn"},
        {name: 'Adresse', type: ValueType.METADATA, referenceValue: "adresse"},
        {name: 'Postnummer', type: ValueType.METADATA, referenceValue: "postnr"},
        {name: 'Kommunenr', type: ValueType.METADATA, referenceValue: "knr"},
        {name: 'Gårdsnr', type: ValueType.METADATA, referenceValue: "gnr"},
        {name: 'Bruksnr', type: ValueType.METADATA, referenceValue: "bnr"},
        {name: 'Kommunenavn', type: ValueType.METADATA, referenceValue: "postnr"},
        {name: 'Prosjektnavn', type: ValueType.METADATA, referenceValue: "prosjektnavn"},
        {name: 'Saksansvarlig', type: ValueType.METADATA, referenceValue: "saksanvarlig"}
    ]
    const valueConvertings: TagProps[] = [
        {
            name: 'til store bokstaver',
            type: ValueType.VALUE_CONVERTING,
            referenceValue: 'VC[1]',
            collection: false,
            requiredFields: [
                {
                    outputType: ValueType.STRING,
                    accept: [ValueType.STRING, ValueType.METADATA, ValueType.VALUE_CONVERTING]
                }
            ]
        },
        {
            name: 'til små bokstaver', type: ValueType.VALUE_CONVERTING, referenceValue: "VC[2]",
            collection: false, requiredFields: [
                {
                    outputType: ValueType.STRING,
                    accept: [ValueType.STRING, ValueType.METADATA, ValueType.VALUE_CONVERTING]
                }
            ]
        },
        {
            name: 'krever en alfanr. og et heltall',
            type: ValueType.VALUE_CONVERTING,
            collection: false,
            referenceValue: "VC[3]",
            requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.INTEGER]},
                {outputType: ValueType.INTEGER, accept: [ValueType.INTEGER]}
            ]
        },
        {
            name: 'krever en alfanr. og en metadata',
            type: ValueType.VALUE_CONVERTING,
            collection: false,
            referenceValue: "VC[4]",
            requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.INTEGER]},
                {outputType: ValueType.METADATA, accept: [ValueType.METADATA]}]
        },
        {
            name: 'slå sammen tekst',
            type: ValueType.VALUE_CONVERTING,
            referenceValue: "VC[5]",
            collection: true,
            requiredFields: [
                {
                    outputType: ValueType.STRING,
                    accept: [ValueType.STRING, ValueType.METADATA, ValueType.VALUE_CONVERTING]
                }]
        },
        {
            name: 'epost til saksansvarlig ID',
            type: ValueType.VALUE_CONVERTING,
            referenceValue: "VC[6]",
            collection: false,
            requiredFields: [
                {
                    outputType: ValueType.STRING,
                    accept: [ValueType.STRING, ValueType.VALUE_CONVERTING, ValueType.METADATA]
                }
            ]
        },
    ]

    interface Field {
        name: string, // navnet på selve felet, tittel, offentlig tittel etc.
        value?: string, // verdien til feltet, som endres på skriving/redigering
        reference?: string, // verdien til feltet dersom det er metadata eller konvertering
        type: ValueType, // hvilken type feltet har som output?
        children: Field[] // feltets underfelt
    }

    interface Root {
        name: string,
        outputType: ValueType,
        child: Field
    }


    const [baseFieldValues, setBaseFieldValues] = useState<string[]>([]);
    const [baseFieldRoot, setBaseFieldRoot] = useState<Root>();

    const handleBaseFieldValueChange = (newValue: string) => {
        setBaseFieldValues([...baseFieldValues, newValue]);
    };

    const methods = useForm<Root>({
        mode: 'onChange',
        defaultValues: {
            name: 'Tittel',
            outputType: ValueType.STRING,
            child: {}
        }
    });

    const onSubmit = (data: Root) => {
        console.log(data)
    };

    console.log(methods.watch())

    return (
        <DndProvider backend={HTML5Backend}>
            <PageTemplate id={'version'} keyPrefix={'pages'} customHeading>
                <HStack gap={"6"} wrap={false}>
                    <VStack gap={"6"}>
                        <VStack gap={"2"}
                                style={{backgroundColor: 'skyblue', padding: '10px', border: '2px solid dimgray'}}>
                            <Heading size={"xsmall"}>Metadata</Heading>
                            {metadatas.map((tag, index) => (
                                <Tag
                                    name={tag.name}
                                    type={tag.type}
                                    collection={tag.collection}
                                    requiredFields={tag.requiredFields}
                                    referenceValue={tag.referenceValue}
                                    key={index}
                                />
                            ))}
                        </VStack>
                        <Box style={{
                            width: '400px',
                            backgroundColor: 'lightgray',
                            padding: '10px',
                            border: '2px solid dimgray'
                        }}>
                            <ToolsComponent displayName={"Verktøy"} content={[]}/>
                        </Box>
                        <VStack gap={"2"} style={{
                            backgroundColor: 'lightgoldenrodyellow',
                            padding: '10px',
                            border: '2px solid dimgray'
                        }}>
                            <Heading size={"xsmall"}>Verdikonvertering</Heading>
                            {valueConvertings.map((tag, index) => (
                                <Tag
                                    name={tag.name}
                                    type={tag.type}
                                    collection={tag.collection}
                                    requiredFields={tag.requiredFields}
                                    referenceValue={tag.referenceValue}
                                    key={index}
                                />
                            ))}
                        </VStack>
                    </VStack>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <VStack gap={"4"}>
                                <Controller
                                    name={"Tittel"}
                                    render={({field, fieldState}) =>
                                        <BaseField topComponent
                                                   outputType={ValueType.STRING}
                                                   accept={[ValueType.STRING, ValueType.INTEGER, ValueType.DOUBLE, ValueType.VALUE_CONVERTING, ValueType.METADATA]}
                                                   fieldState={fieldState}
                                                   onBaseFieldValueChange={handleBaseFieldValueChange}
                                                   setBaseFieldValues={setBaseFieldValues}
                                                   {...field}
                                        />
                                    }
                                />
                            </VStack>
                        </form>
                    </FormProvider>
                </HStack>
            </PageTemplate>
        </DndProvider>
    );
}
export default Playground;