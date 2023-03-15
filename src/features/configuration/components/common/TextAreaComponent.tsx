import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {TextareaAutosize} from "@mui/material";

const TextAreaComponent: React.FunctionComponent<ElementComponentProps> = (props: ElementComponentProps) => {
    return (
        <TextareaAutosize
            id={props.absoluteKey}
            placeholder={props.absoluteKey}
            minRows={3}
            style={{fontFamily: 'sans-serif', fontSize: '16px', width: '280px'}}
        />
    )
}
export default TextAreaComponent