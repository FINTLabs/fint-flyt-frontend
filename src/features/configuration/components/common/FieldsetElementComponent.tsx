import * as React from "react";
import {ReactElement} from "react";
import {ClassNameMap} from "@mui/styles";
import {Box} from "@navikt/ds-react";

export interface Props {
    classes: ClassNameMap,
    content: ReactElement;
}

const FieldsetElementComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <Box>
        {props.content}
    </Box>
}
export default FieldsetElementComponent;