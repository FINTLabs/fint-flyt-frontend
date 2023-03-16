import * as React from "react";
import {useState} from "react";
import {ToggleButton} from "@mui/material";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    displayName: string;
    onSelected: () => void;
    onUnselected: () => void;
    initiallySelected?: boolean
}

const ToggleButtonComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [selected, setSelected] = useState(props.initiallySelected ? props.initiallySelected : false);
    return (
        <>
            <ToggleButton
                value={selected}
                selected={selected}
                onClick={() => {
                    if (!selected) {
                        props.onSelected()
                    } else {
                        props.onUnselected()
                    }
                    setSelected(!selected);
                }}
            >
                {props.displayName}
            </ToggleButton>
        </>
    )
}
export default ToggleButtonComponent;