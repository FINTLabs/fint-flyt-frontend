import {Box} from "@navikt/ds-react";
import * as React from "react";
import {ReactElement} from "react";

export interface Props {
    content: ReactElement;
}

const ArrayValueWrapperComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <Box id={'array-value-wrapper-component'}>
        {props.content}
    </Box>
}
export default ArrayValueWrapperComponent;