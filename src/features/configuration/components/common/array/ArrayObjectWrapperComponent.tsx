import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement} from "react";

export interface Props {
    classes: ClassNameMap,
    content: ReactElement;
}

const ArrayObjectWrapperComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <div className={props.classes.arrayObjectWrapper}>
        <div className={props.classes.wrapperPadding}>
            {props.content}
        </div>
    </div>
}
export default ArrayObjectWrapperComponent;