import * as React from "react";
import {useState} from "react";
import {ToggleButton} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {toggleButtonSX} from "../../styles/SystemStyles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface Props {
    classes: ClassNameMap;
    order: number;
    displayName: string;
    onSelect: () => void;
    onUnselect: () => void;
    disabled?: boolean;
}

const ToggleButtonComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [selected, setSelected] = useState(false);
    return (
        <>
            <ToggleButton
                sx={toggleButtonSX}
                value={selected}
                selected={selected}
                onClick={() => {
                    if (!selected) {
                        props.onSelect();
                    } else {
                        props.onUnselect();
                    }
                    setSelected(!selected);
                }}
                disabled={props.disabled}
            >
                {props.displayName}
                {selected ? <KeyboardArrowLeftIcon/> : <KeyboardArrowRightIcon/>}
            </ToggleButton>
        </>
    )
}
export default ToggleButtonComponent;