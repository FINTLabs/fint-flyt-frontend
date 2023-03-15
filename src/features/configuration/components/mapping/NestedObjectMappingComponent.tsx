import * as React from "react";
import {useState} from "react";
import {ToggleButton} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {toggleButtonSX} from "../../util/CustomStylesUtil";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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
                sx={toggleButtonSX}
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
                {selected ? <KeyboardArrowLeftIcon/> : <KeyboardArrowRightIcon/>}
            </ToggleButton>
        </>
    )
}
export default NestedObjectMappingComponent;