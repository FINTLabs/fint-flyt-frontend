import * as React from "react";
import {useState} from "react";
import {ToggleButton} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {toggleButtonSX} from "../../../../util/styles/SystemStyles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import HelpPopover from "./popover/HelpPopover";

interface Props {
    classes: ClassNameMap;
    order: number;
    displayName: string;
    onSelect: () => void;
    onUnselect: () => void;
    disabled?: boolean;
    description?: string;
    selected?: boolean
}

const ToggleButtonComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [selectedState, setSelectedState] = useState(false);
    const selected: boolean = props.selected === undefined ? selectedState : props.selected;
    const setSelected = props.selected === undefined ? setSelectedState : (value: boolean) => {
        props.selected = value
    }
    return (
        <div className={props.classes.flexRowContainer}>
            <ToggleButton
                sx={toggleButtonSX}
                value={selected}
                selected={props.selected !== undefined ? props.selected : selected}
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
            {props.description && <HelpPopover popoverContent={props.description}/>}
        </div>
    )
}
export default ToggleButtonComponent;