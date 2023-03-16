import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {TextareaAutosize} from "@mui/material";
import {fontFamily} from "../../styles/ConfigurationForm.styles";

const TextAreaComponent: React.FunctionComponent<ElementComponentProps> = (props: ElementComponentProps) => {
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