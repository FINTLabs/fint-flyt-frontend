import type {ReactChild} from 'react'
import React, {forwardRef} from 'react'
import {useDrop} from 'react-dnd'
import {Box, Heading, HStack} from "@navikt/ds-react";
import {Search} from "../../../util/UrlUtils";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import {TagProps} from "./Tag";
import {IconButton} from "@mui/material";
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {typeToIcon} from "../dnd/Tag";
import CancelIcon from '@mui/icons-material/Cancel';
import {getChildByTagType} from "../../../util/CustomFieldUtils";

export interface BaseFieldProps {
    outputType?: ValueType;
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
            if (values.length > 0) {
                return
            }
            if (monitor.didDrop() && !props.greedy) {
                return
            }
            setValues([...values, getChildByTagType(tag)]);
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
    } else if (isOver) {
        background = 'red'
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background
    }


    return (
        <div id={"custom-field-component-" + absoluteKey} key={absoluteKey}>
            <HStack gap={props.topComponent ? "0" : "2"} align={"center"}>
                {props.outputType && typeToIcon(props.outputType)}
                <Box>
                    {props.topComponent && <Heading size={"xsmall"} align={"start"}>{props.name}</Heading>}
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
                                <CancelIcon/>
                            </IconButton>
                        }
                    </HStack>
                </Box>
            </HStack>
        </div>
    )

})
export default BaseField;