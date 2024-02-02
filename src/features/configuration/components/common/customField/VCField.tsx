import React from 'react'
import {Box, HStack} from "@navikt/ds-react";

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {ItemTypes} from "./ItemTypes";
import BaseField from "./BaseField";

export interface VCFieldProps {
    fieldType: string;
    value?: string | undefined
}

const VCField: React.FunctionComponent<VCFieldProps> = (props: VCFieldProps) => {
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightyellow'}}>
            <HStack align={"center"}>
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
export default VCField;
