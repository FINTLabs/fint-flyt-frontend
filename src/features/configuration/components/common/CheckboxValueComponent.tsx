import * as React from 'react';
import { ChangeEvent, useContext } from 'react';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import { ConfigurationContext } from '../../../../context/ConfigurationContext';
import { Noop } from 'react-hook-form/dist/types';

interface Props {
    displayName: string;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    onBlur?: Noop;
    name: string;
    value: boolean;
}

const CheckboxValueComponent: React.FunctionComponent<Props> = (props: Props) => {
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
                value={[props.value && props.name]}>
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
                    }}>
                    {props.displayName}
                </Checkbox>
            </CheckboxGroup>
    );
};

export default CheckboxValueComponent;
