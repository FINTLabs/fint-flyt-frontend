import { Checkbox,CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import { ChangeEvent, forwardRef, useContext } from 'react';
import { Noop } from 'react-hook-form/dist/types';

import { ConfigurationContext } from '../context/ConfigurationContext';

interface Props {
    displayName: string;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    onBlur?: Noop;
    name: string;
    value: boolean;
}

const CheckboxValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>(
    (props: Props) => {
        const { completed } = useContext(ConfigurationContext);

        return (
            <CheckboxGroup
                legend={props.displayName}
                hideLegend
                disabled={props.disabled || completed}
                onChange={(val: string[]) => {
                    if (props.onChange) {
                        props.onChange(val.includes(props.name));
                    }
                }}
                value={[props.value && props.name]}
            >
                <Checkbox
                    size={'small'}
                    id="form-complete"
                    aria-label={props.name + '-checkbox'}
                    value={props.name}
                    onBlur={props.onBlur}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (props.onChange) {
                            props.onChange(event.target.checked);
                        }
                    }}
                >
                    {props.displayName}
                </Checkbox>
            </CheckboxGroup>
        );
    }
);

export default CheckboxValueComponent;
