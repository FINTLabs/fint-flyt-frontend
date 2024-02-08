import {TagProps} from "../components/common/custom/Tag";
import React, {ReactChild} from "react";
import MetadataField from "../components/common/custom/MetadataField";
import EditableField from "../components/common/custom/EditableField";
import ConversionField from "../components/common/custom/ConversionField";

export function getChildByTagType(tag: TagProps): ReactChild {
    switch (tag.type) {
        case 'METADATA':
            return tag.referenceValue ? <MetadataField key={tag.name} metadataType={tag.type} reference={tag.referenceValue} displayName={tag.name}/> : <div key={tag.name}>mangler metadatareferanse</div>
        case 'STRING':
        case 'INTEGER':
        case 'DOUBLE':
            return <EditableField key={tag.name} fieldType={tag.type} value={tag.name} onValueChange={undefined}/>
        case 'VALUE_CONVERTING':
            return <ConversionField key={tag.name} fieldType={tag.type} name={tag.name} collection={tag.collection}
                                    requiredFields={tag.requiredFields} referenceValue={tag.referenceValue}/>
        default:
            return <div key={tag.name}>ukjent</div>
    }
}