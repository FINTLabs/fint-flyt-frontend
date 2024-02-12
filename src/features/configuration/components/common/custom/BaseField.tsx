import React, {forwardRef, useState} from 'react'
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
import ChildField from "./ChildField";

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
    fieldState: ControllerFieldState | undefined;
    onBaseFieldValueChange: (value: string) => void;
}

const BaseField: React.FunctionComponent<BaseFieldProps> = forwardRef<HTMLDivElement, BaseFieldProps>((props: BaseFieldProps, ref) => {
    BaseField.displayName = "CustomFieldComponent"
    const [child, setChild] = useState<TagProps | undefined>(undefined);
    const absoluteKey: string = props.name

    const handleChildFieldValueChange = (newValue: string) => {
        // Pass the value to the callback function received from Playground
        props.onBaseFieldValueChange(newValue);
    };

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: TagProps, monitor) => {
            if (child) {
                return
            }
            if (monitor.didDrop() && !props.greedy) {
                return
            }
            props.onBaseFieldValueChange(tag.name);
            setChild(tag)
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    //TODO: rydde opp i styling og velge farger
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
        if (child) {
            background = 'red';
        } else {
            background = 'lightgreen';
        }
    } else if (canDrop && !props.disabled) {
        if (child) {
            background = 'pink'
        } else {
            background = 'lightcyan';
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
                            {child && <ChildField setValue={setChild} tag={child}
                                                  onBaseFieldValueChange={handleChildFieldValueChange}
                            />}
                        </Box>
                        {child &&
                            <IconButton onClick={() => {
                                setChild(undefined)
                            }}>
                                <CancelIcon/>
                            </IconButton>
                        }
                    </HStack>
                    {child && <div>type: {child.type}, verdi/ref: {child.referenceValue} {child.value}</div>}
                </Box>
            </HStack>
        </div>
    )

})
export default BaseField;