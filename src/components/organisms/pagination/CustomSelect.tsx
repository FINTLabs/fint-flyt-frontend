import { FunctionComponent } from 'react';
import { Select } from '@navikt/ds-react';
import { IPaginationSelect } from '../../types/TableTypes';

type SelectProps = {
    options: IPaginationSelect[];
    onChange: (value: string) => void;
    label: string;
    hideLabel: boolean;
    default: number;
};

export const CustomSelect: FunctionComponent<SelectProps> = (props: SelectProps) => {
    return (
        <Select
            onChange={(e) => props.onChange(e.target.value)}
            defaultValue={props.default}
            label={props.label}
            hideLabel={props.hideLabel}
            size={'small'}
        >
            {props.options.map((option, i) => {
                return (
                    <option key={'option-' + i} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                );
            })}
        </Select>
    );
};
