import type {ReactChild} from 'react'
import React, {forwardRef} from 'react'
import {useDrop} from 'react-dnd'
import {Box, Heading, HStack} from "@navikt/ds-react";
import {Search} from "../../../util/UrlUtils";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import {TagProps} from "./Tag";
import {TrashIcon} from '@navikt/aksel-icons';
import {IconButton} from "@mui/material";
import MetadataField from "./MetadataField";
import EditableField from "./EditableField";
import ConversionField from "./ConversionField";


export interface BaseFieldProps {
    displayName?: string;
    search?: Search;
    greedy?: boolean;
    topComponent: boolean;
    accept: string[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined
}

const BaseField: React.FunctionComponent<BaseFieldProps> = forwardRef<HTMLDivElement, BaseFieldProps>((props: BaseFieldProps, ref) => {
    BaseField.displayName = "CustomFieldComponent"

    const [values, setValues] = React.useState<ReactChild[]>([]);
    const absoluteKey: string = props.name;

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: TagProps, monitor) => {
            console.log(tag)
            if (values.length > 0) {
                return
            }
            if (monitor.didDrop() && !props.greedy) {
                return
            }
            let child: ReactChild;
            if (tag.type === 'metadata') {
                child = <MetadataField key={tag.name} metadataType={tag.type} reference={tag.name}/>
            } else if (tag.type === 'string') {
                child = <EditableField key={tag.name} fieldType={tag.type} value={tag.name}/>
            } else if (tag.type === 'integer') {
                child = <EditableField key={tag.name} fieldType={tag.type} value={tag.name}/>
            } else if (tag.type === 'double') {
                child = <EditableField key={tag.name} fieldType={tag.type} value={tag.name}/>
            } else if (tag.type === 'value_converting') {
                child = <ConversionField key={tag.name} fieldType={tag.type} name={tag.name}/>
            } else {
                child = <div key={tag.name}>ukjent</div>
            }
            setValues([...values, child])
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    let background = 'white';

    const inputStyle = {
        backgroundColor: 'white',
        minWidth: '350px',
        minHeight: '50px',
        width: 'fit-content',
        borderRadius: '4px',
        maxWidth: '1500px',
        margin: 'none'
    };

    if (canDrop && isOver && !props.disabled) {
        if (values.length > 0) {
            background = 'red';
        } else {
            background = 'lightgreen';
        }
    } else if (canDrop && !props.disabled) {
        if (values.length > 0) {
            background = 'pink'
        } else {
            background = 'lightblue';
        }
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background
    }


    return (
        <div id={"custom-field-component-" + absoluteKey} key={absoluteKey}>
            {props.topComponent && <Heading size={"xsmall"} align={"start"}>Felt</Heading>}
            <HStack align={"center"} wrap={false}>
                <Box background={"surface-subtle"} borderWidth={"2"} borderRadius="xlarge"
                     borderColor={"border-subtle"}
                     style={dynamicStyle}
                     ref={dropRef}
                >
                    {values}
                </Box>
                {values.length > 0 &&
                    <IconButton onClick={() => setValues([])}>
                        <TrashIcon title="a11y-title" fontSize="1.5rem"/>
                    </IconButton>
                }
            </HStack>
        </div>
    )

})
export default BaseField;