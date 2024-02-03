import React, {useState} from 'react';
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from "react-dnd";
import BaseField from "../../features/configuration/components/common/custom/BaseField";
import {Tag, TagProps} from "../../features/configuration/components/common/custom/Tag";
import {ValueType} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import {HStack} from "@navikt/ds-react";

const Playground: RouteComponent = () => {
    const [boxes] = useState<TagProps[]>([
        {name: 'I am a string', type: ValueType.STRING},
        {name: '23', type: ValueType.INTEGER},
        {name: '2,99', type: ValueType.DOUBLE},
        {name: 'Fornavn [fornavn]', type: ValueType.METADATA},
        {name: 'til store bokstaver VC[1]', type: ValueType.VALUE_CONVERTING, collection: false, requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.METADATA]}
            ]},
        {
            name: 'krever en alfanr. og en string VC[2]', type: ValueType.VALUE_CONVERTING, collection: false, requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING, ValueType.INTEGER]},
                {outputType: ValueType.STRING, accept: [ValueType.STRING]}]
        },
        {
            name: 'krever en string. og en metadata VC[3]', type: ValueType.VALUE_CONVERTING, collection: false, requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING]},
                {outputType: ValueType.STRING, accept: [ValueType.METADATA]}]
        },
        {
            name: 'slå sammen tekst VC[4]', type: ValueType.VALUE_CONVERTING, collection: true, requiredFields: [
                {outputType: ValueType.STRING, accept: [ValueType.STRING]}]
        }

    ])
    return (
        <DndProvider backend={HTML5Backend}>
            <PageTemplate id={'version'} keyPrefix={'pages'} customHeading>
                <BaseField topComponent
                           outputType={ValueType.STRING}
                           accept={[ValueType.STRING, ValueType.INTEGER, ValueType.DOUBLE, ValueType.VALUE_CONVERTING, ValueType.METADATA]}
                           value={null}
                           name={"testfield"}
                           fieldState={undefined}
                />
                <HStack gap={"2"} style={{width: '600px', overflow: 'auto', clear: 'both'}}>
                    {boxes.map(({name, type, collection, requiredFields}, index) => (
                        <Tag
                            name={name}
                            type={type}
                            collection={collection}
                            requiredFields={requiredFields}
                            key={index}
                        />
                    ))}
                </HStack>
            </PageTemplate>
        </DndProvider>

    );
}
export default Playground;