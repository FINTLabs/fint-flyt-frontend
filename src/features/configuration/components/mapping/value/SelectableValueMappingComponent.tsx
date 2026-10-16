import { Box } from '@navikt/ds-react';
import * as React from 'react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ConfigurationContext } from '../../../context/ConfigurationContext';
import { EditingContext } from '../../../context/EditingContext';
import { useSelectables } from '../../../hooks/useSelectables';
import { ValueType as ConfigurationValueType } from '../../../types/Configuration';
import { ISelectableValueTemplate, SelectableValueType } from '../../../types/FormTemplate';
import { isOutsideCollectionEditContext } from '../../../util/keyUtils';
import {
    ResolvedSelectableInputType,
    resolveSelectableInputType,
} from '../../../util/urlTemplateUtils';
import { hasValidFormat } from '../../../util/validationUtil';
import configurationInputStyles from '../../styles/configuration.module.css';
import DynamicStringOrSearchSelectValueComponent, {
    Type as DynamicStringOrSearchSelectType,
} from './select/DynamicStringOrSearchSelectValueComponent';
import SearchSelectValueComponent from './select/SearchSelectValueComponent';
import SelectValueComponent from './select/SelectValueComponent';

interface Props {
    order: number;
    absoluteKey: string;
    displayName: string;
    description: string;
    template: ISelectableValueTemplate;
    disabled?: boolean;
}

function toDynamicStringOrSearchSelectType(
    resolved: ResolvedSelectableInputType
): DynamicStringOrSearchSelectType {
    return DynamicStringOrSearchSelectType[resolved];
}

function toStoredConfigurationType(type: DynamicStringOrSearchSelectType): ConfigurationValueType {
    switch (type) {
        case DynamicStringOrSearchSelectType.SELECT:
        case DynamicStringOrSearchSelectType.URL_TEMPLATE:
            return ConfigurationValueType.STRING;
        case DynamicStringOrSearchSelectType.DYNAMIC:
            return ConfigurationValueType.DYNAMIC_STRING;
        case DynamicStringOrSearchSelectType.VALUE_CONVERTING:
            return ConfigurationValueType.VALUE_CONVERTING;
        default:
            throw new Error('Invalid dynamicStringOrSearchSelectType');
    }
}

function toValidationType(type: DynamicStringOrSearchSelectType): ConfigurationValueType {
    if (type === DynamicStringOrSearchSelectType.URL_TEMPLATE) {
        return ConfigurationValueType.URL_TEMPLATE;
    }
    return toStoredConfigurationType(type);
}

const SelectableValueMappingComponent: React.FunctionComponent<Props> = (props) => {
    const { control, setValue, getValues, watch } = useFormContext();
    const { completed } = useContext(ConfigurationContext);
    const { editCollectionAbsoluteKey } = useContext(EditingContext);

    const absoluteKeySplit = props.absoluteKey.split('.');
    const selectables = useSelectables(
        control,
        props.template.selectables,
        props.template.selectablesSources,
        absoluteKeySplit.slice(0, absoluteKeySplit.length - 2).join('.')
    );
    const typeAbsoluteKey: string = props.absoluteKey + '.type';
    const mappingStringAbsoluteKey: string = props.absoluteKey + '.mappingString';

    const storedType: ConfigurationValueType | undefined = getValues(typeAbsoluteKey);
    const mappingString: string | null | undefined = getValues(mappingStringAbsoluteKey);

    const resolvedInputType = useMemo(
        () =>
            resolveSelectableInputType(
                storedType,
                mappingString,
                selectables,
                props.template.referenceTemplate
            ),
        [storedType, mappingString, selectables, props.template.referenceTemplate]
    );

    const initialUiType = toDynamicStringOrSearchSelectType(resolvedInputType);

    const [validationType, setValidationType] = useState<ConfigurationValueType>(() =>
        toValidationType(initialUiType)
    );
    const userPickedMode = useRef(false);

    useEffect(() => {
        if (userPickedMode.current) {
            return;
        }
        const next = toValidationType(initialUiType);
        setValidationType((current) => (current === next ? current : next));
    }, [initialUiType]);

    useEffect(() => {
        if (!getValues(typeAbsoluteKey)) {
            setValue(typeAbsoluteKey, ConfigurationValueType.STRING);
        }
    }, [getValues, setValue, typeAbsoluteKey]);

    return (
        <Controller
            name={mappingStringAbsoluteKey}
            rules={{
                validate: (value) => hasValidFormat(value, validationType, watch('completed')),
            }}
            defaultValue={
                props.template.type == SelectableValueType.DROPDOWN
                    ? (props.template.selectables?.[0]?.value ?? '')
                    : null
            }
            render={({ field, fieldState }) => {
                const disabled =
                    !!props.disabled ||
                    isOutsideCollectionEditContext(field.name, editCollectionAbsoluteKey) ||
                    completed;

                let controlledInputElement: React.ReactElement;

                switch (props.template.type) {
                    case SelectableValueType.DROPDOWN:
                        controlledInputElement = (
                            <SelectValueComponent
                                {...field}
                                displayName={props.displayName}
                                description={props.description}
                                selectables={selectables}
                                disabled={disabled}
                            />
                        );
                        break;

                    case SelectableValueType.SEARCH_SELECT:
                        controlledInputElement = (
                            <SearchSelectValueComponent
                                {...field}
                                displayName={props.displayName}
                                description={props.description}
                                selectables={selectables}
                                disabled={disabled}
                            />
                        );
                        break;
                    case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                        controlledInputElement = (
                            <DynamicStringOrSearchSelectValueComponent
                                {...field}
                                displayName={props.displayName}
                                description={props.description}
                                selectables={selectables}
                                referenceTemplate={props.template.referenceTemplate}
                                fieldState={fieldState}
                                initialType={toDynamicStringOrSearchSelectType(
                                    resolveSelectableInputType(
                                        getValues(typeAbsoluteKey),
                                        field.value,
                                        selectables,
                                        props.template.referenceTemplate
                                    )
                                )}
                                onTypeChange={(type: DynamicStringOrSearchSelectType) => {
                                    userPickedMode.current = true;
                                    const nextValidation = toValidationType(type);
                                    setValidationType((current) =>
                                        current === nextValidation ? current : nextValidation
                                    );
                                    if (
                                        getValues(typeAbsoluteKey) !==
                                        toStoredConfigurationType(type)
                                    ) {
                                        setValue(typeAbsoluteKey, toStoredConfigurationType(type));
                                    }
                                }}
                                disabled={disabled}
                            />
                        );
                        break;
                }

                return (
                    <Box
                        id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                        className={configurationInputStyles.inputContainer}
                    >
                        {controlledInputElement}
                    </Box>
                );
            }}
        />
    );
};

export default SelectableValueMappingComponent;
