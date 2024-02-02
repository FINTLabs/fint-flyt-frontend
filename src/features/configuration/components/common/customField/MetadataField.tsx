import React from 'react'
import {Box, HStack} from "@navikt/ds-react";

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export interface MetadataFieldProps {
    metadataType: string;
    reference: string

}

const MetadataField: React.FunctionComponent<MetadataFieldProps> = (props: MetadataFieldProps) => {
    return (
        <Box padding="4" borderWidth={"2"} borderRadius="medium"
             borderColor={"border-subtle"} style={{backgroundColor: 'lightblue'}}>
            <HStack>
                <AutoAwesomeIcon/>
                {props.reference}
            </HStack>
        </Box>
    )
}
export default MetadataField;
