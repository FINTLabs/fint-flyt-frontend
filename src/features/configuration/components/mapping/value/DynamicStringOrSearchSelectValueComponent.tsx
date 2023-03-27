import * as React from "react";
import {useEffect, useState} from "react";
import {ISelectable} from "../../../types/Selectable";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import SearchSelectValueComponent from "./select/SearchSelectValueComponent";
import DynamicStringValueComponent from "./string/DynamicStringValueComponent";
import {ClassNameMap} from "@mui/styles";
import {ValueType as MetadataValueType} from "../../../types/Metadata/IntegrationMetadata";
import {useFormContext} from "react-hook-form";
import {ValueType} from "../../../types/Configuration";

interface Props {
    classes: ClassNameMap
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    field: ControllerRenderProps;
}

const DynamicStringOrSearchSelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {setValue, getValues} = useFormContext();
    const [selectValue, setSelectValue] = useState<string | null>(null)
    const [dynamicValue, setDynamicValue] = useState<string>('')

    // TODO eivindmorch 26/03/2023 : Fix
    const typeAbsoluteKey: string = props.field.name.slice(0, props.field.name.length - 14) + ".type";
    const absoluteKey: string = props.field.name;

    useEffect(() => {
        const type: string = getValues(typeAbsoluteKey)
        if (type === ValueType.DYNAMIC_STRING.toString()) {
            setSelectValue("$dynamic")
        }
    }, [])

    return <fieldset className={props.classes.fieldSet}>
        <SearchSelectValueComponent
            displayName={props.displayName}
            selectables={[
                {
                    displayName: "Dynamisk verdi",
                    value: "$dynamic"
                },
                ...props.selectables
            ]}
            disabled={props.disabled}
            field={{
                onChange: (value: string) => {
                    setSelectValue(value)
                    if (value === "$dynamic") {
                        setValue(typeAbsoluteKey, ValueType.DYNAMIC_STRING)
                        setValue(absoluteKey, "")
                    } else {
                        setValue(typeAbsoluteKey, ValueType.STRING)
                        setValue(absoluteKey, value)
                    }
                },
                onBlur: () => {
                },
                value: selectValue,
                name: props.field.name,
                ref: () => {
                },
            }}
        />
        {selectValue === "$dynamic" && <DynamicStringValueComponent
            classes={props.classes}
            accept={[
                MetadataValueType.STRING,
                MetadataValueType.INTEGER,
                MetadataValueType.EMAIL,
                MetadataValueType.DATE,
                MetadataValueType.PHONE
            ]}
            disabled={props.disabled}
            field={{
                onChange: (value: string) => {
                    setDynamicValue(value)
                    props.field.onChange(value)
                },
                onBlur: () => {
                },
                value: dynamicValue,
                name: props.field.name,
                ref: () => {
                },
            }}
        />}
    </fieldset>
}

export default DynamicStringOrSearchSelectValueComponent;
