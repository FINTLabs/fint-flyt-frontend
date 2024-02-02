import React from 'react'
import {Box, HStack} from "@navikt/ds-react";

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
            <HStack>
                {props.fieldType === 'string' ? <FormatSizeIcon/> : <NumbersIcon/>}
                <Box>
                    {props.value && props.value}
                </Box>
            </HStack>
        </Box>
    )
}
export default EditableField;
