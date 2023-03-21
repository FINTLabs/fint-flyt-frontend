import * as React from "react";
import {ReactElement} from "react";
import {ClassNameMap} from "@mui/styles";

export interface Props {
    classes: ClassNameMap,
    content: ReactElement;
}

const FieldsetElement: React.FunctionComponent<Props> = (props: Props) => {
    return <div className={props.classes.fieldsetElement}>
        {props.content}
    </div>
}
export default FieldsetElement;