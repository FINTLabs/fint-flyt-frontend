import * as React from "react";
import {useState} from "react";
import {ToggleButton} from "@mui/material";
import {toggleButtonSX} from "../../../../util/styles/SystemStyles";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {HelpText, HStack, VStack} from "@navikt/ds-react";

interface Props {
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
        <VStack id={'toggle-button-' + props.displayName + '-' + props.order}>
            <HStack align={"center"} gap={"2"}>
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
                {props.description &&
                    <HelpText title={"Hva er dette?"} placement={"right"}>{props.description}</HelpText>
                }
            </HStack>
        </VStack>
    )
}
export default ToggleButtonComponent;