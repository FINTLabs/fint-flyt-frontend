import React, {forwardRef, ReactChild, useState} from 'react'
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
    fieldState: ControllerFieldState | undefined
}


const BaseField: React.FunctionComponent<BaseFieldProps> = forwardRef<HTMLDivElement, BaseFieldProps>((props: BaseFieldProps, ref) => {
    BaseField.displayName = "CustomFieldComponent"
    // TODO: få disse inn i et objekt? props som inneholder ReactChild component også?
    const [childProps, setChildProps] = useState<TagProps | undefined>(undefined);
    const [childComponent, setChildComponent] = useState<ReactChild | undefined>(undefined);
    const absoluteKey: string = props.name;

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: TagProps, monitor) => {
            if (childComponent) {
                return
            }
            if (monitor.didDrop() && !props.greedy) {
                return
            }
            setChildProps(tag)
            setChildComponent(
                <ChildField setValue={setChildProps} tag={tag}/>
            )
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
        if (childComponent) {
            background = 'red';
        } else {
            background = 'lightgreen';
        }
    } else if (canDrop && !props.disabled) {
        if (childComponent) {
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
                            {childComponent}
                        </Box>
                        {childComponent &&
                            <IconButton onClick={() => {
                                setChildComponent(undefined)
                                setChildProps(undefined)
                            }}>
                                <CancelIcon/>
                            </IconButton>
                        }
                    </HStack>
                    {childProps && <div>type: {childProps.type}, verdi/ref: {childProps.referenceValue} {childProps.value}</div>}
                </Box>
            </HStack>
        </div>
    )

})
export default BaseField;