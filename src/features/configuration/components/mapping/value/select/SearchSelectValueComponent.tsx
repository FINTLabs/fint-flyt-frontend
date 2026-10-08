import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef, useMemo } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';

import { ISelectable } from '../../../../types/Selectable';
import configurationStyles from '../../../styles/configuration.module.css';

interface Props {
    displayName: string;
    
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<
    HTMLInputElement,
    Props
>((props: Props, ref) => {
    const absoluteKey: string = props.name;

    const options = useMemo(
        () =>
            props.selectables.map((selectable) => ({
                label: selectable.displayName,
                value: selectable.value,
            })),
        [props.selectables]
    );

    const selectedOptions = useMemo(() => {
        if (!props.value) {
            return [];
        }
        const match = options.find((option) => option.value === props.value);
        return match ? [match] : [{ label: props.value, value: props.value }];
    }, [options, props.value]);

    const isLoading = props.selectables.length === 0;

    return (
        <div id={'search-select-' + absoluteKey} className={configurationStyles.inputFullWidth}>
            <UNSAFE_Combobox
                id={absoluteKey}
                ref={ref}
                className={`${configurationStyles.input} ${configurationStyles.inputFullWidth}`}
                label={props.displayName}
                size="small"
                options={options}
                selectedOptions={selectedOptions}
                onToggleSelected={(option, isSelected) => {
                    props.onChange?.(isSelected ? option : null);
                }}
                onBlur={props.onBlur}
                disabled={props.disabled}
                isLoading={isLoading}
                shouldAutocomplete
                error={props.fieldState?.error?.message}
                errorId={`error-message-${absoluteKey}`}
            />
        </div>
    );
});

SearchSelectValueComponent.displayName = 'SearchSelectValueComponent';
export default SearchSelectValueComponent;
