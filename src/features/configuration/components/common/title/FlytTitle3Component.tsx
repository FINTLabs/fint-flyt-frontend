import {ClassNameMap} from "@mui/styles";
import * as React from "react";

interface Props {
    classes: ClassNameMap;
    title: string;
}

const FlytTitle3Component: React.FunctionComponent<Props> = (props: Props) => {
    return <h3 className={props.classes.title3}>{props.title}</h3>
}
export default FlytTitle3Component