import * as React from "react";
import {forwardRef, useEffect, useState} from "react";
import {ISelectable} from "../../../types/Selectable";
import SearchSelectValueComponent from "./select/SearchSelectValueComponent";
import {ClassNameMap} from "@mui/styles";
import {ValueType as MetadataValueType} from "../../../types/Metadata/IntegrationMetadata";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import DynamicChipComponent from "./string/DynamicChipComponent";
import {Box} from "@navikt/ds-react";

interface Props {
    classes: ClassNameMap
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    initialType: Type;
    onTypeChange?: (type: Type) => void;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined
}

export enum Type {
    SELECT,
    DYNAMIC,
    VALUE_CONVERTING
}

const DynamicStringOrSearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props) => {
    DynamicStringOrSearchSelectValueComponent.displayName = "DynamicStringOrSearchSelectValueComponent"
    const [selectValue, setSelectValue] = useState<string | null>(null)
    const [dynamicValue, setDynamicValue] = useState<string>('')

    useEffect(() => {
        if (props.initialType === undefined || props.initialType === Type.SELECT) {
            setSelectValue(props.value)
        } else if (props.initialType === Type.DYNAMIC) {
            setSelectValue("$dynamic")
            if (props.value) {
                setDynamicValue(props.value)
            }
        } else if (props.initialType === Type.VALUE_CONVERTING) {
            setSelectValue("$valueConverting")
            if (props.value) {
                setDynamicValue(props.value)
            }
        }
    }, [])

    return <Box>
        <SearchSelectValueComponent
            displayName={props.displayName}
            selectables={[
                {
                    displayName: "Dynamisk verdi",
                    value: "$dynamic"
                },
                {
                    displayName: "Verdikonvertering",
                    value: "$valueConverting"
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
                            setDynamicValue("")
                            props.onChange("")
                        }
                    } else if (value === "$valueConverting") {
                        if (props.onTypeChange) {
                            props.onTypeChange(Type.VALUE_CONVERTING)
                        }
                        if (props.onChange) {
                            setDynamicValue("")
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
        {(selectValue === "$dynamic" || selectValue === '$valueConverting') &&
            <DynamicChipComponent
                fieldState={props.fieldState}
                accept={selectValue === "$dynamic"
                    ? [
                        MetadataValueType.STRING,
                        MetadataValueType.INTEGER,
                        MetadataValueType.EMAIL,
                        MetadataValueType.DATE,
                        MetadataValueType.PHONE
                    ]
                    : [
                        MetadataValueType.STRING,
                        MetadataValueType.INTEGER,
                        MetadataValueType.EMAIL,
                        MetadataValueType.DATE,
                        MetadataValueType.PHONE,
                        MetadataValueType.VALUE_CONVERTING
                    ]
                }
                disabled={props.disabled}
                onChange={(value: string) => {
                    setDynamicValue(value)
                    if (props.onChange) {
                        props.onChange(value)
                    }
                }}
                value={dynamicValue}
                name={props.name}
            />
        }
    </Box>
})
export default DynamicStringOrSearchSelectValueComponent;
