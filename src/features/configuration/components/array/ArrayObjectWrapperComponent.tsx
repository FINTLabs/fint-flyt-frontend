import {Box} from "@navikt/ds-react";
import * as React from "react";
import {ReactElement} from "react";

export interface Props {
    content: ReactElement;
}

const ArrayObjectWrapperComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <Box>
        {props.content}
    </Box>
}
export default ArrayObjectWrapperComponent;