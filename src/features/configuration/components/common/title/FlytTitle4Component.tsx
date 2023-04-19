import {ClassNameMap} from "@mui/styles";
import * as React from "react";

interface Props {
    classes: ClassNameMap;
    id?: string,
    title: string;
}

const FlytTitle4Component: React.FunctionComponent<Props> = (props: Props) => {
    return <h4 id={props.id} className={props.classes.title4}>{props.title}</h4>
}
export default FlytTitle4Component