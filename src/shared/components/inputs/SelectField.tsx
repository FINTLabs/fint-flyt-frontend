import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef, useEffect } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';

import { ISelectable } from '../../../features/configuration/types/Selectable';
import DisplayNameWithHelpText from './DisplayNameWithHelpText';
import formStyles from './formStyles.module.css';

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState;
    description?: string;
    emptyOptionLabel?: string;
}

const SelectField: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>(
    (props: Props, ref) => {
        const absoluteKey: string = props.name;
        const hasEmptyOption = props.emptyOptionLabel !== undefined;

        useEffect(() => {
            if (hasEmptyOption) {
                return;
            }
            if (
                props.selectables.length > 0 &&
                (props.value === '' || props.value === null || props.value === undefined) &&
                props.onChange
            ) {
                props.onChange(props.selectables[0].value);
            }
        }, [hasEmptyOption, props.selectables, props.value, props.onChange]);

        return (
            <Select
                id={absoluteKey}
                className={formStyles.input}
                size={'small'}
                label={
                    <DisplayNameWithHelpText
                        displayName={props.displayName}
                        description={props.description}
                    />
                }
                onChange={(event) => props.onChange?.(event.target.value)}
                onBlur={props.onBlur}
                name={props.name}
                value={props.value ?? ''}
                ref={ref as React.Ref<HTMLSelectElement>}
                disabled={props.disabled}
                error={props.fieldState?.error?.message}
            >
                {hasEmptyOption && (
                    <option value="" disabled={true}>
                        {props.emptyOptionLabel}
                    </option>
                )}
                {props.selectables.map((selectable: ISelectable, index: number) => (
                    <option key={absoluteKey + '.' + index} value={selectable.value}>
                        {selectable.displayName}
                    </option>
                ))}
            </Select>
        );
    }
);

SelectField.displayName = 'SelectField';
export default SelectField;
