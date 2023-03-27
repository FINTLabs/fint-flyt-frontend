import * as React from "react";
import {IValueTemplate, ValueType as TemplateValueType} from "../../../types/FormTemplate";
import StringValueComponent from "./string/StringValueComponent";
import DynamicStringValueComponent from "./string/DynamicStringValueComponent";
import {Controller, useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../../types/Configuration";
import {ValueType as MetadataValueType} from "../../../types/Metadata/IntegrationMetadata";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../../common/popover/HelpPopover";
import {Search, SourceStatefulValue} from "../../../util/UrlUtils";

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
    const {getValues, setValue} = useFormContext();
    const typeAbsoluteKey: string = props.absoluteKey + ".type";
    const valueAbsoluteKey: string = props.absoluteKey + ".mappingString";

    function setTypeIfUndefined(type: ConfigurationValueType) {
        if (!getValues(typeAbsoluteKey)) {
            setValue(typeAbsoluteKey, type)
        }
    }

    let search: Search | undefined;
    if (props.template.search) {
        const absoluteKeySplit = props.absoluteKey.split(".");
        search = SourceStatefulValue(props.template.search, absoluteKeySplit.slice(0, absoluteKeySplit.length - 2).join("."));
    }

    return <Controller
        name={valueAbsoluteKey}
        render={({field}) => {
            switch (props.template.type) {
                case TemplateValueType.STRING:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <StringValueComponent
                            {...field}
                            classes={props.classes}
                            displayName={props.displayName}
                            disabled={props.disabled}
                        />
                        {props.description && <HelpPopover popoverContent={props.description}/>}
                    </div>
                case TemplateValueType.DYNAMIC_STRING:
                    setTypeIfUndefined(ConfigurationValueType.DYNAMIC_STRING);
                    return <div id={'value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <DynamicStringValueComponent
                            {...field}
                            classes={props.classes}
                            displayName={props.displayName}
                            search={search}
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
                    setTypeIfUndefined(ConfigurationValueType.FILE);
                    return <div id={'value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <DynamicStringValueComponent
                            {...field}
                            classes={props.classes}
                            displayName={props.displayName}
                            accept={[
                                MetadataValueType.FILE
                            ]}
                            disabled={props.disabled}
                        />
                        {props.description && <HelpPopover popoverContent={props.description}/>}
                    </div>
            }
        }}
    />
}
export default ValueMappingComponent;