import * as React from "react";
import {forwardRef, useEffect, useState} from "react";
import {ISelectable} from "../../../types/Selectable";
import SearchSelectValueComponent from "./select/SearchSelectValueComponent";
import DynamicStringValueComponent from "./string/DynamicStringValueComponent";
import {ClassNameMap} from "@mui/styles";
import {ValueType as MetadataValueType} from "../../../types/Metadata/IntegrationMetadata";
import {Noop} from "react-hook-form/dist/types";

interface Props {
    classes: ClassNameMap
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    initialType: Type | string;
    onTypeChange?: (type: Type) => void;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
}

export enum Type {
    SELECT,
    DYNAMIC
}

const DynamicStringOrSearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<any, Props>((props: Props, ref) => {
    const [selectValue, setSelectValue] = useState<string | null>(null)
    const [dynamicValue, setDynamicValue] = useState<string>('')

    useEffect(() => {
        if (props.initialType === 'DYNAMIC_STRING' || props.initialType === Type.DYNAMIC) {
            setSelectValue("$dynamic")
            if (props.value) {
                setDynamicValue(props.value)
            }
        } else {
            setSelectValue(props.value)
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
            onChange={
                (value: string | null) => {
                    setSelectValue(value)
                    if (value === "$dynamic") {
                        if (props.onTypeChange) {
                            props.onTypeChange(Type.DYNAMIC)
                        }
                        if (props.onChange) {
                            props.onChange("")
                        }
                    } else {
                        if (props.onTypeChange && props.initialType !== Type.SELECT) {
                            props.onTypeChange(Type.SELECT)
                        }
                        if (props.onChange) {
                            props.onChange(value)
                        }
                    }
                }
            }
            onBlur={props.onBlur}
            value={selectValue}
            name={props.name}
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
            onChange={(value: string) => {
                setDynamicValue(value)
                if (props.onChange) {
                    props.onChange(value)
                }
            }}
            value={dynamicValue}
            name={props.name}
        />}
    </fieldset>
})
export default DynamicStringOrSearchSelectValueComponent;
