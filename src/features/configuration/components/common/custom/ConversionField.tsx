import React from 'react'
import {Box, Heading, HStack} from "@navikt/ds-react";

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {ItemTypes} from "./ItemTypes";
import BaseField from "./BaseField";

export interface VCFieldProps {
    fieldType: string;
    name: string | null
}

const ConversionField: React.FunctionComponent<VCFieldProps> = (props: VCFieldProps) => {
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightyellow'}}>
            <Heading size={"xsmall"} align={"start"}>{props.name}</Heading>
            <HStack gap={"2"} align={"center"} wrap={false}>
                <SettingsSuggestIcon/>
                <BaseField
                    accept={[ItemTypes.STRING, ItemTypes.INTEGER, ItemTypes.DOUBLE, ItemTypes.VALUE_CONVERTING, ItemTypes.METADATA]}
                    topComponent={false}
                    value={null}
                    greedy
                    name={"testfield"}
                    fieldState={undefined}
                />
            </HStack>
        </Box>
    )
}
export default ConversionField;