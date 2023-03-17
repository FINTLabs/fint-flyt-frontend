import * as React from "react";
import {TextareaAutosize} from "@mui/material";
import {fontFamily} from "../../styles/ConfigurationForm.styles";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
}

const TextAreaComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <TextareaAutosize
            className={props.classes.input}
            style={{fontFamily: fontFamily, width: '270px'}}
            id={props.absoluteKey}
            placeholder={props.absoluteKey}
            minRows={3}
        />
    )
}
export default TextAreaComponent