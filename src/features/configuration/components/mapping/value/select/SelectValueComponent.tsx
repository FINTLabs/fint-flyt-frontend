import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef, useEffect } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';

import { ISelectable } from '../../../../types/Selectable';
import FormErrorText from '../../../FormErrorText';
import DisplayNameWithHelpText from '../../../inputs/DisplayNameWithHelpText';
import configurationInputStyles from '../../../styles/configuration.module.css';

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
}

const SelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>(
    (props: Props, ref) => {
        const absoluteKey: string = props.name;

        // Keep form state in sync with the option the browser shows when value is empty
        // (native <select> displays the first option even if value is '').
        useEffect(() => {
            if (
                props.selectables.length > 0 &&
                (props.value === '' || props.value === null || props.value === undefined) &&
                props.onChange
            ) {
                props.onChange(props.selectables[0].value);
            }
        }, [props.selectables, props.value, props.onChange]);

        return (
            <>
                <Select
                    id={absoluteKey}
                    className={configurationInputStyles.input}
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
                    {props.selectables.map((selectable: ISelectable, index: number) => (
                        <option key={absoluteKey + '.' + index} value={selectable.value}>
                            {selectable.displayName}
                        </option>
                    ))}
                </Select>
                {props.fieldState?.error && (
                    <FormErrorText errorMessage={props.fieldState?.error.message} />
                )}
            </>
        );
    }
);

SelectValueComponent.displayName = 'SelectValueComponent';
export default SelectValueComponent;
