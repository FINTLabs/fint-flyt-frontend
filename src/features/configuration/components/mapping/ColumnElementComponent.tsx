import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement} from "react";
import PathComponent from "../common/PathComponent";

import FlytTitleComponent from "../common/title/FlytTitleComponent";


export interface Props {
    classes: ClassNameMap;
    index: number;
    title: string;
    path: string[];
    content: ReactElement;
}

const ColumnElementComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <div id={'column-item-' + props.index} className={props.classes.columnItem}>
        <div className={props.classes.wrapperPadding}>
            <div>
                <FlytTitleComponent variant="h2" classes={props.classes} title={props.title}/>
                {props.path.length > 0 && <PathComponent classes={props.classes} path={props.path}/>}
            </div>
            {props.content}
        </div>
    </div>
}
export default ColumnElementComponent