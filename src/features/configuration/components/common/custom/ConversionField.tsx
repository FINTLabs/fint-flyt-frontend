import React, {useState} from 'react'
import {Box, Heading, HStack, VStack} from "@navikt/ds-react";

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import BaseField from "./BaseField";
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {IconButton} from "@mui/material";
import {PlusIcon} from "@navikt/aksel-icons";
import {MinusIcon} from "@navikt/aksel-icons";

export interface VCFieldProps {
    fieldType: string;
    name: string | null
    collection?: boolean
    requiredFields?: { outputType: ValueType, accept: ValueType[] }[]
}

const ConversionField: React.FunctionComponent<VCFieldProps> = (props: VCFieldProps) => {
    const [reqFields, setReqFields] = useState<{ outputType: ValueType, accept: ValueType[] }[]>(props.requiredFields ?? [])
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightyellow'}}>
            <HStack gap={"2"} align={"center"} >
                <SettingsSuggestIcon/>
                <Heading size={"xsmall"} align={"start"}>{props.name}</Heading>
            </HStack>
            <HStack gap={"2"} align={"center"} wrap={false}>
                <VStack gap={"4"}>
                    {reqFields && reqFields.map((field, index) => {
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