import { VStack } from '@navikt/ds-react';
import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { Noop } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';

import { IReferenceTemplate } from '../../../../types/FormTemplate';
import { ValueType as MetadataValueType } from '../../../../types/Metadata/IntegrationMetadata';
import { ISelectable } from '../../../../types/Selectable';
import configurationStyles from '../../../styles/configuration.module.css';
import DynamicChipComponent from '../string/DynamicChipComponent';
import SearchSelectValueComponent from './SearchSelectValueComponent';
import { matchesReferenceTemplate } from '../../../../util/urlTemplateUtils';
import UrlTemplateBuilder from './urlTemplateBuilder/UrlTemplateBuilder';

interface Props {
    displayName: string;
    description?: string;
    selectables: ISelectable[];
    disabled?: boolean;
    initialType: Type;
    onTypeChange?: (type: Type) => void;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined;
    referenceTemplate?: IReferenceTemplate | null;
}

export enum Type {
    SELECT = 'SELECT',
    URL_TEMPLATE = 'URL_TEMPLATE',
    DYNAMIC = 'DYNAMIC',
    VALUE_CONVERTING = 'VALUE_CONVERTING',
}

const DynamicStringOrSearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<
    HTMLDivElement,
    Props
>((props, ref) => {
    const [selectValue, setSelectValue] = useState<string | null>(null);
    const [dynamicValue, setDynamicValue] = useState<string>('');
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });
    const hasReferenceTemplate = Boolean(props.referenceTemplate);
    const userHasChangedType = useRef(false);

    useEffect(() => {
        if (userHasChangedType.current) {
            return;
        }
        if (props.initialType === undefined || props.initialType === Type.SELECT) {
            setSelectValue(props.value);
        } else if (props.initialType === Type.DYNAMIC) {
            setSelectValue('$dynamic');
            if (props.value) {
                setDynamicValue(props.value);
            }
        } else if (props.initialType === Type.VALUE_CONVERTING) {
            setSelectValue('$valueConverting');
            if (props.value) {
                setDynamicValue(props.value);
            }
        } else if (props.initialType === Type.URL_TEMPLATE && hasReferenceTemplate) {
            setSelectValue('$urlTemplate');
        }
    }, [props.initialType, props.value, hasReferenceTemplate]);

    return (
        <VStack ref={ref} gap={'1'} className={configurationStyles.inputFullWidth}>
            <SearchSelectValueComponent
                displayName={props.displayName}
                description={props.description}
                selectables={[
                    {
                        displayName: t('label.customValue'),
                        value: '$dynamic',
                    },
                    {
                        displayName: t('label.valueConverting'),
                        value: '$valueConverting',
                    },
                    ...(hasReferenceTemplate
                        ? [
                              {
                                  displayName: t('label.urlTemplate'),
                                  value: '$urlTemplate',
                              },
                          ]
                        : []),
                    ...props.selectables,
                ]}
                disabled={props.disabled}
                onChange={(value: string | null) => {
                    userHasChangedType.current = true;
                    setSelectValue(value);
                    if (value === '$dynamic') {
                        if (props.onTypeChange) {
                            props.onTypeChange(Type.DYNAMIC);
                        }
                        if (props.onChange) {
                            setDynamicValue('');
                            props.onChange('');
                        }
                    } else if (value === '$urlTemplate' && hasReferenceTemplate) {
                        if (props.onTypeChange) {
                            props.onTypeChange(Type.URL_TEMPLATE);
                        }
                        if (props.onChange) {
                            setDynamicValue('');
                            props.onChange('');
                        }
                    } else if (value === '$valueConverting') {
                        if (props.onTypeChange) {
                            props.onTypeChange(Type.VALUE_CONVERTING);
                        }
                        if (props.onChange) {
                            setDynamicValue('');
                            props.onChange('');
                        }
                    } else {
                        if (props.onTypeChange && props.initialType !== Type.SELECT) {
                            props.onTypeChange(Type.SELECT);
                        }
                        if (props.onChange) {
                            props.onChange(value);
                        }
                    }
                }}
                onBlur={props.onBlur}
                value={selectValue}
                name={props.name}
            />
            {(selectValue === '$dynamic' || selectValue === '$valueConverting') && (
                <DynamicChipComponent
                    fieldState={props.fieldState}
                    accept={
                        selectValue === '$dynamic'
                            ? [
                                  MetadataValueType.STRING,
                                  MetadataValueType.INTEGER,
                                  MetadataValueType.EMAIL,
                                  MetadataValueType.DATE,
                                  MetadataValueType.PHONE,
                              ]
                            : [
                                  MetadataValueType.STRING,
                                  MetadataValueType.INTEGER,
                                  MetadataValueType.EMAIL,
                                  MetadataValueType.DATE,
                                  MetadataValueType.PHONE,
                                  MetadataValueType.VALUE_CONVERTING,
                              ]
                    }
                    disabled={props.disabled}
                    onChange={(value: string) => {
                        setDynamicValue(value);
                        if (props.onChange) {
                            props.onChange(value);
                        }
                    }}
                    value={dynamicValue}
                    name={props.name}
                />
            )}
            {hasReferenceTemplate && selectValue === '$urlTemplate' && (
                <UrlTemplateBuilder
                    fieldState={props.fieldState}
                    disabled={props.disabled}
                    name={props.name}
                    referenceTemplate={props.referenceTemplate}
                    selectedValue={props.value}
                    onChange={props.onChange ?? undefined}
                />
            )}
            {hasReferenceTemplate &&
                selectValue &&
                selectValue !== '$urlTemplate' &&
                selectValue !== '$dynamic' &&
                selectValue !== '$valueConverting' &&
                matchesReferenceTemplate(selectValue, props.referenceTemplate) && (
                    <UrlTemplateBuilder
                        key={selectValue}
                        fieldState={props.fieldState}
                        disabled={true}
                        name={props.name}
                        referenceTemplate={props.referenceTemplate}
                        selectedValue={selectValue}
                    />
                )}
        </VStack>
    );
});

DynamicStringOrSearchSelectValueComponent.displayName = 'DynamicStringOrSearchSelectValueComponent';
export default DynamicStringOrSearchSelectValueComponent;
