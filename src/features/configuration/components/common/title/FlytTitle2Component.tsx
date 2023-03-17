import {ClassNameMap} from "@mui/styles";
import * as React from "react";

interface Props {
    classes: ClassNameMap;
    title: string;
}

const FlytTitle2Component: React.FunctionComponent<Props> = (props: Props) => {
    return <h2 className={props.classes.title2}>{props.title}</h2>
}
export default FlytTitle2Component