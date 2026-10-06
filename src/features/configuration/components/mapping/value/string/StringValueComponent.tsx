import { Textarea, TextField } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';

import DisplayNameWithHelpText from '../../../inputs/DisplayNameWithHelpText';
import configurationStyles from '../../../styles/configuration.module.css';

interface Props {
    displayName: string;
    description?: string;
    multiline?: boolean;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: Noop;
    required?: boolean;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined;
}

const StringValueComponent: React.FunctionComponent<Props> = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    Props
>((props: Props, ref) => {
    const absoluteKey: string = props.name;
    const sharedProps = {
        id: absoluteKey,
        className: configurationStyles.input,
        size: 'small' as const,
        label: (
            <DisplayNameWithHelpText
                displayName={props.displayName}
                description={props.description}
            />
        ),
        onChange: props.onChange,
        onBlur: props.onBlur,
        name: props.name,
        value: props.value ?? '',
        disabled: props.disabled,
        required: props.required,
        autoComplete: 'off',
        error: props.fieldState?.error?.message,
    };

    return (
        <div id={'string-value-component-' + absoluteKey}>
            {props.multiline ? (
                <Textarea
                    {...sharedProps}
                    maxRows={4}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                />
            ) : (
                <TextField {...sharedProps} ref={ref as React.Ref<HTMLInputElement>} />
            )}
        </div>
    );
});

StringValueComponent.displayName = 'StringValueComponent';
export default StringValueComponent;
