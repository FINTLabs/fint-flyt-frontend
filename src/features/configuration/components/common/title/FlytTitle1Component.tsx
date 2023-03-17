import {ClassNameMap} from "@mui/styles";
import * as React from "react";

interface Props {
    classes: ClassNameMap;
    title: string;
}

const FlytTitle1Component: React.FunctionComponent<Props> = (props: Props) => {
    return <h1 className={props.classes.title1}>{props.title}</h1>
}
export default FlytTitle1Component