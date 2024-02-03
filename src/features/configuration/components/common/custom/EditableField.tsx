import React, {useRef, useState} from 'react'
import {Box, Button, Heading, HStack, Modal, TextField} from "@navikt/ds-react";
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {typeToIcon} from "../dnd/Tag";

export interface EditableFieldProps {
    fieldType: string;
    value: string
}

const EditableField: React.FunctionComponent<EditableFieldProps> = (props: EditableFieldProps) => {
    const [value, setValue] = useState<string>(props.value)
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightgray'}}>
            <Modal ref={ref} header={{heading: "Endre"}}>
                <Modal.Body>
                    <form method="dialog" id="skjema">
                        <TextField type={props.fieldType === ValueType.STRING ? 'text' : "number"}
                                   onChange={(event) => {
                                       {
                                           setValue(event.target.value)
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
            <HStack gap={"2"} style={{cursor: 'pointer'}} onDoubleClick={() => ref.current?.showModal()}>
                {typeToIcon(props.fieldType)}
                <Heading size={"xsmall"} style={{backgroundColor: "white", whiteSpace: 'pre'}}>
                    {value}
                </Heading>
            </HStack>
        </Box>
    )
}
export default EditableField;