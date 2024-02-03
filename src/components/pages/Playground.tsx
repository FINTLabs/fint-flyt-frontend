import React, {useState} from 'react';
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from "react-dnd";
import BaseField from "../../features/configuration/components/common/custom/BaseField";
import {Tag, TagProps} from "../../features/configuration/components/common/custom/Tag";
import {ValueType} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import {Box, HStack, VStack} from "@navikt/ds-react";
import ToolsComponent from "../../features/configuration/components/tools/ToolsComponent";

const Playground: RouteComponent = () => {
    const [boxes] = useState<TagProps[]>([
        /*        {name: 'I am a string', type: ValueType.STRING},
                {name: '23', type: ValueType.INTEGER},
                {name: '2,99', type: ValueType.DOUBLE},*/
        {name: 'Fornavn [fornavn]', type: ValueType.METADATA},
        {name: 'Etternavn [etternavn]', type: ValueType.METADATA},
        {name: 'Postnummer [postnr]', type: ValueType.METADATA},
        {
            name: 'til store bokstaver VC[1]', type: ValueType.VALUE_CONVERTING, collection: false, requiredFields: [
                {
                    outputType: ValueType.STRING,
                    accept: [ValueType.STRING, ValueType.METADATA, ValueType.VALUE_CONVERTING]
                }
            ]
        },
        {
            name: 'krever en alfanr. og en string VC[2]',
            type: ValueType.VALUE_CONVERTING,
            collection: false,
            requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.INTEGER]},
                {outputType: ValueType.STRING, accept: [ValueType.STRING]}]
        },
        {
            name: 'krever en string. og en metadata VC[3]',
            type: ValueType.VALUE_CONVERTING,
            collection: false,
            requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING]},
                {outputType: ValueType.METADATA, accept: [ValueType.METADATA]}]
        },
        {
            name: 'slå sammen tekst VC[4]', type: ValueType.VALUE_CONVERTING, collection: true, requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING]}]
        }

    ])
    return (
        <DndProvider backend={HTML5Backend}>
            <PageTemplate id={'version'} keyPrefix={'pages'} customHeading>
                <HStack gap={"6"} wrap={false}>
                    <VStack gap={"6"}>
                        <Box style={{width: '400px'}}>
                            <ToolsComponent displayName={"Verktøy"} content={[]}/>
                        </Box>
                        <VStack gap={"2"} style={{width: '500px', overflow: 'auto', clear: 'both'}}>
                            {boxes.map(({name, type, collection, requiredFields}, index) => (
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
                        <BaseField topComponent
                                   outputType={ValueType.STRING}
                                   accept={[ValueType.STRING, ValueType.INTEGER, ValueType.DOUBLE, ValueType.VALUE_CONVERTING, ValueType.METADATA]}
                                   value={null}
                                   name={"testFelt"}
                                   displayName={"Felt1"}
                                   fieldState={undefined}
                        />
                        <BaseField topComponent
                                   outputType={ValueType.STRING}
                                   accept={[ValueType.STRING, ValueType.INTEGER, ValueType.DOUBLE, ValueType.VALUE_CONVERTING, ValueType.METADATA]}
                                   value={null}
                                   name={"testFelt"}
                                   displayName={"Felt2"}
                                   fieldState={undefined}
                        />
                    </VStack>
                </HStack>
            </PageTemplate>
        </DndProvider>

    );
}
export default Playground;