import * as React from 'react';
import { forwardRef } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';

import { Select } from '@navikt/ds-react';

import configurationInputStyles from '../../../styles/configuration.module.css';
import { ISelectable } from '../../../../types/Selectable';
import DisplayNameWithHelpText from '../../../inputs/DisplayNameWithHelpText';
import FormErrorText from '../../../FormErrorText';

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState;
    description?: string;
}

const SelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>(
    (props: Props, ref) => {
        const absoluteKey: string = props.name;
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
                    onChange={
                        props.onChange as React.ChangeEventHandler<HTMLSelectElement> | undefined
                    }
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
