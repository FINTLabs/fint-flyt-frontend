import * as React from "react";
import {useState} from "react";
import {ToggleButton} from "@mui/material";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    displayName: string;
    onChildOpen: () => void
    onChildClose: () => void
}

const NestedObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [selected, setSelected] = useState(false);
    return (
        <>
            <ToggleButton
                value={selected}
                selected={selected}
                onClick={() => {
                    if (!selected) {
                        props.onChildOpen()
                    } else {
                        props.onChildClose()
                    }
                    setSelected(!selected);
                }}
            >
                {props.displayName}
            </ToggleButton>
        </>
    )
}
export default NestedObjectMappingComponent;