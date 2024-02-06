import {TagProps} from "../components/common/custom/Tag";
import React, {ReactChild} from "react";
import MetadataField from "../components/common/custom/MetadataField";
import EditableField from "../components/common/custom/EditableField";
import ConversionField from "../components/common/custom/ConversionField";

export function getChildByTagType(tag: TagProps): ReactChild {
    switch (tag.type) {
        case 'METADATA':
            return <MetadataField key={tag.name} metadataType={tag.type} reference={tag.name}/>
        case 'STRING':
        case 'INTEGER':
        case 'DOUBLE':
            return <EditableField key={tag.name} fieldType={tag.type} value={tag.name}/>
        case 'VALUE_CONVERTING':
            return <ConversionField key={tag.name} fieldType={tag.type} name={tag.name} collection={tag.collection}
                                    requiredFields={tag.requiredFields}/>
        default:
            return <div key={tag.name}>ukjent</div>
    }
}