import * as React from "react";
import {IValueTemplate, ValueType as TemplateValueType} from "../../types/FormTemplate";
import StringValueComponent from "../common/StringValueComponent";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../types/Configuration";
import {ValueType as MetadataValueType} from "../../types/Metadata/IntegrationMetadata";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../popover/HelpPopover";

interface Props {
    classes: ClassNameMap;
    order: number;
    absoluteKey: string;
    displayName: string;
    description?: string;
    template: IValueTemplate,
    disabled?: boolean;
    hidden?: boolean;
}

const ValueMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {setValue} = useFormContext();
    const valueAbsoluteKey: string = props.absoluteKey + ".mappingString"
    switch (props.template.type) {
        case TemplateValueType.STRING:
            setValue(props.absoluteKey + ".type", ConfigurationValueType.STRING)
            return <div id={'value-mapping-wrapper-' + props.absoluteKey}
                        className={props.classes.valueMappingContainer}>
                <StringValueComponent
                    classes={props.classes}
                    absoluteKey={valueAbsoluteKey}
                    displayName={props.displayName}
                    disabled={props.disabled}
                />
                {props.description && <HelpPopover popoverContent={props.description}/>}
            </div>
        case TemplateValueType.DYNAMIC_STRING:
            setValue(props.absoluteKey + ".type", ConfigurationValueType.DYNAMIC_STRING)
            return <div id={'value-mapping-wrapper-' + props.absoluteKey}
                        className={props.classes.valueMappingContainer}>
                <DynamicStringValueComponent
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
                    disabled={props.disabled}
                />
                {props.description && <HelpPopover popoverContent={props.description}/>}
            </div>
        case TemplateValueType.FILE:
            setValue(props.absoluteKey + ".type", ConfigurationValueType.FILE)
            return <div id={'value-mapping-wrapper-' + props.absoluteKey}
                        className={props.classes.valueMappingContainer}>
                <DynamicStringValueComponent
                    classes={props.classes}
                    absoluteKey={valueAbsoluteKey}
                    displayName={props.displayName}
                    accept={[
                        MetadataValueType.FILE
                    ]}
                    disabled={props.disabled}
                />
                {props.description && <HelpPopover popoverContent={props.description}/>}
            </div>
    }
}
export default ValueMappingComponent;