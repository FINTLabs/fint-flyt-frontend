import React, {useState} from 'react';
import PageTemplate from "../templates/PageTemplate";
import {RouteComponent} from "../../routes/Route";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from "react-dnd";
import BaseField from "../../features/configuration/components/common/custom/BaseField";
import {ItemTypes} from "../../features/configuration/components/common/custom/ItemTypes";
import {Tag} from "../../features/configuration/components/common/custom/Tag";

const Playground: RouteComponent = () => {
    const [boxes] = useState<{ name: string, type: string, collection?: boolean }[]>([
        {name: 'I am a string', type: ItemTypes.STRING},
        {name: '23', type: ItemTypes.INTEGER},
        {name: '2,99', type: ItemTypes.DOUBLE},
        {name: 'Fornavn [fornavn]', type: ItemTypes.METADATA},
        {name: 'til store bokstaver VC[1]', type: ItemTypes.VALUE_CONVERTING},
        {name: 'Vil ha flere inputs VC[2]', type: ItemTypes.VALUE_CONVERTING, collection: true}
    ])
    return (
        <DndProvider backend={HTML5Backend}>
            <PageTemplate id={'version'} keyPrefix={'pages'} customHeading>
                <BaseField topComponent
                           accept={[ItemTypes.STRING, ItemTypes.INTEGER, ItemTypes.DOUBLE, ItemTypes.VALUE_CONVERTING, ItemTypes.METADATA]}
                           value={null}
                           name={"testfield"}
                           fieldState={undefined}
                />
                <div style={{overflow: 'auto', clear: 'both'}}>
                    {boxes.map(({name, type, collection}, index) => (
                        <Tag
                            name={name}
                            type={type}
                            collection={collection}
                            key={index}
                        />
                    ))}
                </div>
            </PageTemplate>
        </DndProvider>

    );
}
export default Playground;