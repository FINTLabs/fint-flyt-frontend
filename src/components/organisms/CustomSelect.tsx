import {ITableSelect} from "../../util/TableUtil";
import * as React from "react";
import {Select} from "@navikt/ds-react";

type SelectProps = {
    options: ITableSelect[],
    onChange: (value: string) => void,
    label: string,
    hideLabel: boolean
}

export const CustomSelect: React.FunctionComponent<SelectProps> = (props: SelectProps) => {
    return (
        <Select onChange={(e) => props.onChange(e.target.value)} label={props.label} hideLabel={props.hideLabel}
                size={"small"}>
            {props.options.map((option, i) => {
                return <option key={'option-' + i} value={option.value}
                               disabled={option.disabled}>{option.label}</option>
            })}
        </Select>
    );
}