import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';

import inputStyles from '../../styles/input.module.css';
import { ISelectable } from '../../types/Selectable';

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState;
}

const SelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLSelectElement, Props>(
    (props: Props, ref) => {
        const absoluteKey: string = props.name;
        return (
            <Select
                id={absoluteKey}
                className={inputStyles.input}
                size={'small'}
                label={props.displayName}
                onChange={props.onChange}
                onBlur={props.onBlur}
                name={props.name}
                value={props.value ?? ''}
                ref={ref}
                disabled={props.disabled}
                error={props.fieldState?.error?.message}
            >
                {props.selectables.map((selectable: ISelectable, index: number) => (
                    <option key={absoluteKey + '.' + index} value={selectable.value}>
                        {selectable.displayName}
                    </option>
                ))}
            </Select>
        );
    }
);

SelectValueComponent.displayName = 'SelectValueComponent';
export default SelectValueComponent;
