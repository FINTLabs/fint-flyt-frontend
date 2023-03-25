import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement} from "react";

export interface Props {
    classes: ClassNameMap,
    content: ReactElement;
}

const ArrayValueWrapperComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <div className={props.classes.arrayValueWrapper}>
        {props.content}
    </div>
}
export default ArrayValueWrapperComponent;