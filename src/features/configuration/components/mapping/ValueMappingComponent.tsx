import * as React from "react";
import {IValueTemplate, ValueType as TemplateValueType} from "../../types/FormTemplate";
import StringValueComponent from "../common/StringValueComponent";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../types/Configuration";
import {ValueType as MetadataValueType} from "../../types/Metadata/IntegrationMetadata";
import {ClassNameMap} from "@mui/styles";
import DragAndDropComponent from "../common/DragAndDropComponent";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    displayName: string;
    template: IValueTemplate
}

const ValueMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {setValue} = useFormContext();
    const valueAbsoluteKey: string = props.absoluteKey + ".mappingString"
    switch (props.template.type) {
        case TemplateValueType.STRING:
            setValue(props.absoluteKey + ".type", ConfigurationValueType.STRING)
            return <StringValueComponent
                classes={props.classes}
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
            />
        case TemplateValueType.DYNAMIC_STRING:
            setValue(props.absoluteKey + ".type", ConfigurationValueType.DYNAMIC_STRING)
            return <DynamicStringValueComponent
                classes={props.classes}
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
                accept={[
                    MetadataValueType.STRING,
                    MetadataValueType.INTEGER,
                    MetadataValueType.EMAIL,
                    MetadataValueType.DATE,
                    MetadataValueType.PHONE
                ]}
            />
        case TemplateValueType.FILE:
            setValue(props.absoluteKey + ".type", ConfigurationValueType.FILE)
            return <DragAndDropComponent
                classes={props.classes}
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
                accept={[
                    MetadataValueType.FILE
                ]}
            />
    }
}
export default ValueMappingComponent;