import React, {useState} from 'react'
import {Box, Heading, HStack, VStack} from "@navikt/ds-react";

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {IconButton} from "@mui/material";
import {PlusIcon} from "@navikt/aksel-icons";
import {MinusIcon} from "@navikt/aksel-icons";
import {IRequiredField} from "./Tag";

export interface VCFieldProps {
    fieldType: string;
    name: string | null
    collection?: boolean
    requiredFields?: IRequiredField[]
    referenceValue?: string;
}

const ConversionField: React.FunctionComponent<VCFieldProps> = (props: VCFieldProps) => {
    const [reqFields, setReqFields] = useState<IRequiredField[]>(props.requiredFields ?? [])
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightyellow'}}>
            <HStack gap={"2"} align={"center"} >
                <SettingsSuggestIcon/>
                <Heading size={"xsmall"} align={"start"}>{props.name} {props.referenceValue}</Heading>
            </HStack>
            <HStack gap={"2"} align={"center"} wrap={false}>
                <VStack gap={"4"}>
                    {props.collection &&
                        <HStack justify={"end"}>
                            <IconButton type="button" onClick={() => {
                                setReqFields([...reqFields, reqFields[0]])}
                            }>
                                <PlusIcon title="a11y-title" fontSize="1.5rem" />
                            </IconButton>
                            {reqFields.length > 1 && <IconButton type="button" onClick={() => {
                                setReqFields(reqFields.slice(0, -1))}}>
                                <MinusIcon title="a11y-title" fontSize="1.5rem" />
                            </IconButton>}
                        </HStack>
                    }
                </VStack>
            </HStack>
        </Box>
    )
}
export default ConversionField;