import * as React from 'react';
import { forwardRef, useContext, useState } from 'react';
import { ISelectableValueTemplate, SelectableValueType } from '../../../types/FormTemplate';
import SelectValueComponent from './select/SelectValueComponent';
import { Controller, useFormContext } from 'react-hook-form';
import { ValueType as ConfigurationValueType } from '../../../types/Configuration';
import { useSelectablesStatefulValue } from '../../../util/SelectablesUtils';
import SearchSelectValueComponent from './select/SearchSelectValueComponent';
import DynamicStringOrSearchSelectValueComponent, {
    Type as DynamicStringOrSearchSelectType,
} from './DynamicStringOrSearchSelectValueComponent';
import { isOutsideCollectionEditContext } from '../../../util/KeyUtils';
import { ConfigurationContext } from '../../../../../context/ConfigurationContext';
import { EditingContext } from '../../../../../context/EditingContext';
import { hasValidFormat } from '../../../util/ValidationUtil';
import { HelpText, HStack } from '@navikt/ds-react';

interface Props {
    order: number;
    absoluteKey: string;
    displayName: string;
    description: string;
    template: ISelectableValueTemplate;
    disabled?: boolean;
}

const SelectableValueMappingComponent: React.FunctionComponent<Props> = forwardRef<
    HTMLDivElement,
    Props
>((props) => {
    SelectableValueMappingComponent.displayName = 'SelectableValueMappingComponent';
    const { control, setValue, getValues, watch } = useFormContext();
    const { completed } = useContext(ConfigurationContext);
    const { editCollectionAbsoluteKey } = useContext(EditingContext);

    const absoluteKeySplit = props.absoluteKey.split('.');
    const selectables = useSelectablesStatefulValue(
        control,
        props.template.selectables,
        props.template.selectablesSources,
        absoluteKeySplit.slice(0, absoluteKeySplit.length - 2).join('.')
    );
    const typeAbsoluteKey: string = props.absoluteKey + '.type';

    const initialType: { type: ConfigurationValueType; mappingString: string } = getValues(
        props.absoluteKey
    );

    const [validationType, setValidationType] = useState<ConfigurationValueType>(
        initialType ? initialType.type : ConfigurationValueType.STRING
    );

    function setTypeIfUndefined(type: ConfigurationValueType) {
        if (!getValues(typeAbsoluteKey)) {
            setValue(typeAbsoluteKey, type);
        }
    }

    function getDynamicStringOrSearchSelectTypeFromConfigurationType(
        configurationType: ConfigurationValueType
    ): DynamicStringOrSearchSelectType {
        switch (configurationType) {
            case ConfigurationValueType.STRING:
                return DynamicStringOrSearchSelectType.SELECT;
            case ConfigurationValueType.DYNAMIC_STRING:
                return DynamicStringOrSearchSelectType.DYNAMIC;
            case ConfigurationValueType.VALUE_CONVERTING:
                return DynamicStringOrSearchSelectType.VALUE_CONVERTING;
            default:
                throw new Error('Invalid configurationValueType');
        }
    }

    function getConfigurationTypeFromDynamicStringOrSearchSelectType(
        dynamicStringOrSearchSelectType: DynamicStringOrSearchSelectType
    ): ConfigurationValueType {
        switch (dynamicStringOrSearchSelectType) {
            case DynamicStringOrSearchSelectType.SELECT:
                return ConfigurationValueType.STRING;
            case DynamicStringOrSearchSelectType.DYNAMIC:
                return ConfigurationValueType.DYNAMIC_STRING;
            case DynamicStringOrSearchSelectType.VALUE_CONVERTING:
                return ConfigurationValueType.VALUE_CONVERTING;
            default:
                throw new Error('Invalid dynamicStringOrSearchSelectType');
        }
    }

    return (
        <Controller
            name={props.absoluteKey + '.mappingString'}
            rules={{
                validate: (value) => hasValidFormat(value, validationType, watch('completed')),
            }}
            defaultValue={props.template.type == SelectableValueType.DROPDOWN ? '' : null}
            render={({ field, fieldState }) => {
                switch (props.template.type) {
                    case SelectableValueType.DROPDOWN:
                        setTypeIfUndefined(ConfigurationValueType.STRING);
                        return (
                            <HStack
                                id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                align={'center'}
                                gap={'2'}
                            >
                                <SelectValueComponent
                                    {...field}
                                    displayName={props.displayName}
                                    selectables={selectables}
                                    disabled={
                                        props.disabled ||
                                        isOutsideCollectionEditContext(
                                            field.name,
                                            editCollectionAbsoluteKey
                                        ) ||
                                        completed
                                    }
                                />
                                <HelpText placement={'right'}>{props.description}</HelpText>
                            </HStack>
                        );
                    case SelectableValueType.SEARCH_SELECT:
                        setTypeIfUndefined(ConfigurationValueType.STRING);
                        return (
                            <HStack
                                id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                align={'center'}
                                gap={'2'}
                            >
                                <SearchSelectValueComponent
                                    {...field}
                                    displayName={props.displayName}
                                    selectables={selectables}
                                    disabled={
                                        props.disabled ||
                                        isOutsideCollectionEditContext(
                                            field.name,
                                            editCollectionAbsoluteKey
                                        ) ||
                                        completed
                                    }
                                />
                                <HelpText placement={'right'}>{props.description}</HelpText>
                            </HStack>
                        );
                    case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                        setTypeIfUndefined(ConfigurationValueType.STRING);
                        return (
                            <HStack
                                id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                align={'center'}
                                gap={'2'}
                            >
                                <DynamicStringOrSearchSelectValueComponent
                                    {...field}
                                    displayName={props.displayName}
                                    selectables={selectables}
                                    fieldState={fieldState}
                                    initialType={getDynamicStringOrSearchSelectTypeFromConfigurationType(
                                        getValues(typeAbsoluteKey)
                                    )}
                                    onTypeChange={(type: DynamicStringOrSearchSelectType) => {
                                        setValidationType(
                                            getConfigurationTypeFromDynamicStringOrSearchSelectType(
                                                type
                                            )
                                        );
                                        setValue(
                                            typeAbsoluteKey,
                                            getConfigurationTypeFromDynamicStringOrSearchSelectType(
                                                type
                                            )
                                        );
                                    }}
                                    disabled={
                                        props.disabled ||
                                        isOutsideCollectionEditContext(
                                            field.name,
                                            editCollectionAbsoluteKey
                                        ) ||
                                        completed
                                    }
                                />
                                <HelpText placement={'right'}>{props.description}</HelpText>
                            </HStack>
                        );
                }
            }}
        />
    );
});
export default SelectableValueMappingComponent;
