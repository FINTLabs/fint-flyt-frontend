import {ClassNameMap} from "@mui/styles";
import * as React from "react";

interface Props {
    classes: ClassNameMap;
    title: string;
}

const FlytCategoryHeaderComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <h6 className={props.classes.categoryHeader}>{props.title}</h6>
}
export default FlytCategoryHeaderComponent