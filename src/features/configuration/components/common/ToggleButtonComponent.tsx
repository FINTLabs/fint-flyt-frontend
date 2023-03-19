import * as React from "react";
import {ToggleButton} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {toggleButtonSX} from "../../styles/SystemStyles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface Props {
    classes: ClassNameMap;
    displayName: string;
    onSelected: () => void;
    onUnselected: () => void;
    selected: boolean;
    disabled?: boolean;
}

const ToggleButtonComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <ToggleButton
                sx={toggleButtonSX}
                value={props.selected}
                selected={props.selected}
                onClick={() => {
                    if (!props.selected) {
                        props.onSelected()
                    } else {
                        props.onUnselected()
                    }
                }}
                disabled={props.disabled}
            >
                {props.displayName}
                {props.selected ? <KeyboardArrowLeftIcon/> : <KeyboardArrowRightIcon/>}
            </ToggleButton>
        </>
    )
}
export default ToggleButtonComponent;