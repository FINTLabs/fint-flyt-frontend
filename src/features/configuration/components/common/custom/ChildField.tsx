import React, {Dispatch, SetStateAction, useState} from 'react'
import {Box, Heading, HStack, TextField, VStack} from "@navikt/ds-react";

import {typeToIcon} from "../dnd/Tag";
import {IRequiredField, TagProps} from "./Tag";
import BaseField from "./BaseField";
import {IconButton} from "@mui/material";
import {CheckmarkCircleFillIcon, MinusIcon, PlusIcon} from "@navikt/aksel-icons";
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {getBackgroundColorByType, isEditable} from "../../../util/CustomFieldUtils";

export interface ChildFieldProps {
    tag: TagProps;
    setValue: Dispatch<SetStateAction<TagProps | undefined>>
}

const ChildField: React.FunctionComponent<ChildFieldProps> = (props: ChildFieldProps) => {
    const [reqFields, setReqFields] = useState<IRequiredField[]>(props.tag.requiredFields ?? [])
    const [value, setValue] = useState<string | undefined>(props.tag.value)
    const [edit, setEdit] = useState<boolean>(false)

    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: getBackgroundColorByType(props.tag.type)}}>
            {isEditable(props.tag.type) && <HStack gap={"2"} style={{cursor: 'pointer'}} onDoubleClick={() => setEdit(true)}>
                {typeToIcon(props.tag.type)}
                <Heading size={"xsmall"} style={{backgroundColor: "white", whiteSpace: 'pre'}}>
                    {!edit && value}
                </Heading>
                {edit &&
                    <HStack align={"center"}>
                        <TextField
                            size={"small"}
                            style={{width: 'fit-content', padding: 'none'}}
                            type={props.tag.type === ValueType.STRING ? 'text' : "number"}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                setEdit(false)
                                }
                            }}
                            onChange={(event) => {
                                {
                                    setValue(event.target.value)
                                    props.setValue({...props.tag, value: event.target.value})
                                }
                            }} id={"value"} name={"input"} defaultValue={value} label=""/>
                        <IconButton onClick={() => setEdit(false)}>
                            <CheckmarkCircleFillIcon title="Ferdig" fontSize="1.5rem" />
                        </IconButton>
                    </HStack>
                }
            </HStack>}
            {!isEditable(props.tag.type) && <HStack gap={"2"}>
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