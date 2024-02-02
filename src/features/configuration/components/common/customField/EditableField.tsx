import React from 'react'
import {Box, Heading, HStack} from "@navikt/ds-react";

import FormatSizeIcon from '@mui/icons-material/FormatSize';
import NumbersIcon from '@mui/icons-material/Numbers';

export interface EditableFieldProps {
    fieldType: string;
    value?: string | undefined
}

const EditableField: React.FunctionComponent<EditableFieldProps> = (props: EditableFieldProps) => {
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightgray'}}>
            <HStack gap={"2"}>
                {props.fieldType === 'string' ? <FormatSizeIcon/> : <NumbersIcon/>}
                <Heading size={"xsmall"} style={{backgroundColor: "white", whiteSpace: 'pre'}}>
                    {props.value && props.value}
                </Heading>
            </HStack>
        </Box>
    )
}
export default EditableField;
