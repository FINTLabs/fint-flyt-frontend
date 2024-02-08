import React, {Dispatch, SetStateAction, useRef, useState} from 'react'
import {Box, Button, Heading, HStack, Modal, TextField, VStack} from "@navikt/ds-react";

import {typeToIcon} from "../dnd/Tag";
import {IRequiredField, TagProps} from "./Tag";
import BaseField from "./BaseField";
import {IconButton} from "@mui/material";
import {MinusIcon, PlusIcon} from "@navikt/aksel-icons";
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";

export interface ChildFieldProps {
    tag: TagProps;
    setValue: Dispatch<SetStateAction<TagProps | undefined>>
}

function isEditable(type: string): boolean {
    switch (type) {
        case 'STRING':
        case 'INTEGER':
        case 'DOUBLE':
            return true
        default:
            return false
    }
}

function getColorByType(type: string): string {
    switch (type) {
        case 'METADATA' :
            return 'skyblue'
        case 'STRING':
        case 'INTEGER':
        case 'DOUBLE':
            return 'lightgray'
        case 'VALUE_CONVERTING':
            return 'lightgoldenrodyellow'
        default:
            return 'white'
    }
}

const ChildField: React.FunctionComponent<ChildFieldProps> = (props: ChildFieldProps) => {
    const [reqFields, setReqFields] = useState<IRequiredField[]>(props.tag.requiredFields ?? [])
    const [value, setValue] = useState<string | undefined>(props.tag.value)
    const ref = useRef<HTMLDialogElement>(null);
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: getColorByType(props.tag.type)}}>
            <Modal ref={ref} header={{heading: "Endre"}}>
                <Modal.Body>
                    <form method="dialog" id="skjema">
                        <TextField type={props.tag.type === ValueType.STRING ? 'text' : "number"}
                                   onChange={(event) => {
                                       {
                                           setValue(event.target.value)
                                           props.setValue({...props.tag, value: event.target.value})
                                       }
                                   }} id={"value"} name={"input"} defaultValue={value} label=""/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={() => {
                        ref.current?.close()
                    }}>
                        Bekreft
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => ref.current?.close()}
                    >
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
            {isEditable(props.tag.type) && <HStack gap={"2"} style={{cursor: 'pointer'}} onDoubleClick={() => ref.current?.showModal()}>
            {typeToIcon(props.tag.type)}
                <Heading size={"xsmall"} style={{backgroundColor: "white", whiteSpace: 'pre'}}>
                    {value}
                </Heading>
            </HStack>}
            {!isEditable(props.tag.type) && <HStack gap={"2"} onDoubleClick={() => ref.current?.showModal()}>
                {typeToIcon(props.tag.type)}
                {props.tag.name}
                {props.tag.type === 'METADATA' || props.tag.type === 'VALUE_CONVERTING' && [props.tag.referenceValue]}
            </HStack>}
            {reqFields && <HStack gap={"2"} align={"center"} wrap={false}>
                <VStack gap={"4"}>
                    {reqFields.map((field, index) => {
                        return <BaseField
                            outputType={field.outputType}
                            key={index}
                            accept={field.accept}
                            topComponent={false}
                            value={null}
                            greedy
                            name={"testfield"}
                            fieldState={undefined}
                        />
                    })}
                    {props.tag.collection &&
                        <HStack justify={"end"}>
                            <IconButton type="button" onClick={() => {
                                setReqFields([...reqFields, reqFields[0]])
                            }
                            }>
                                <PlusIcon title="a11y-title" fontSize="1.5rem"/>
                            </IconButton>
                            {reqFields.length > 1 && <IconButton type="button" onClick={() => {
                                setReqFields(reqFields.slice(0, -1))
                            }}>
                                <MinusIcon title="a11y-title" fontSize="1.5rem"/>
                            </IconButton>}
                        </HStack>
                    }
                </VStack>
            </HStack>}
        </Box>
    );
}
export default ChildField;