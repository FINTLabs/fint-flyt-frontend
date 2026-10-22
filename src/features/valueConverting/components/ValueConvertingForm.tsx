import { Button, Fieldset, Heading, HelpText, HGrid, HStack, VStack, Box } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';

import useResourceRepository from '../../../shared/api/useResourceRepository';
import useIntegrationConfigurationRepository from '../../../shared/api/useIntegrationConfigurationRepository';
import FormPageWrapper from '../../../shared/components/layout/FormPageWrapper';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import {
    destinations,
    fromTypeIds,
    toTypeIds,
} from '../../../shared/defaults/valueConvertingTypes';
import { IAlertContent } from '../../../shared/types/AlertContent';
import { ISelect } from '../../../shared/types/Select';
import { sourceApplicationsToSelectable } from '../../../shared/util/formUtil';
import { sortSelectables } from '../../../shared/util/selectableUtils';
import { IValueConverting } from '../types/ValueConverting';
import { ISelectable } from '../types/Selectable';
import StringField from '../../../shared/components/inputs/StringField';
import SelectField from '../../../shared/components/inputs/SelectField';
import styles from '../../../shared/components/inputs/formStyles.module.css';
import DisplayNameWithHelpText from '../../../shared/components/inputs/DisplayNameWithHelpText';
import SearchField from '../../../shared/components/inputs/SearchField';
import FieldArray from '../../../shared/components/inputs/FieldArray';

type Props = {
    existingValueConverting: IValueConverting | undefined;
    setExistingValueConverting: React.Dispatch<React.SetStateAction<IValueConverting | undefined>>;
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean;
    onAlert: (content: IAlertContent) => void;
    onSuccess: (content: IAlertContent) => void;
};
type IValueConvertingFormData = Omit<IValueConverting, 'convertingMap'> & {
    convertingArray: IValueConvertingConvertingArrayEntry[];
};

type IValueConvertingConvertingArrayEntry = { from: string; to: string };

export const ValueConvertingForm: React.FunctionComponent<Props> = (props: Props) => {
    const IntegrationConfigurationRepository = useIntegrationConfigurationRepository();
    const ResourceRepository = useResourceRepository();

    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const [toSelectables, setToSelectables] = useState<ISelectable[]>([]);
    const [selectableSourceApplications, setSelectableSourceApplications] = useState<ISelect[]>([]);
    const [valueConvertings, setValueConvertings] = useState<string[] | undefined>(undefined);

    function getSelectableSourceApplications() {
        const currentFromApplicationId = props.existingValueConverting?.fromApplicationId;

        getAllSourceApplications(false).then((sourceApplications) => {
            const options = sourceApplicationsToSelectable(
                sourceApplications.filter(
                    (sa) =>
                        sa.available ||
                        (currentFromApplicationId != null &&
                            sa.id === Number(currentFromApplicationId))
                )
            );

            if (
                currentFromApplicationId != null &&
                !options.some((opt) => opt.value === String(currentFromApplicationId))
            ) {
                options.push({
                    value: String(currentFromApplicationId),
                    label: String(currentFromApplicationId),
                });
            }

            setSelectableSourceApplications(options);
        });
    }

    useEffect(() => {
        getSelectableSourceApplications();
        ResourceRepository.getSelectableKodeverkFormat().then((result) => {
            const sortedResult = sortSelectables(result.data);
            setToSelectables(sortedResult);
        });

        IntegrationConfigurationRepository.getValueConvertings({
            page: 0,
            size: 1000,
            sortProperty: 'id',
            sortDirection: 'DESC',
            excludeConvertingMap: true,
        })
            .then((response) => {
                const data: IValueConverting[] = response.data.content;
                if (data) {
                    setValueConvertings(data.map((vc) => vc.displayName));
                } else {
                    setValueConvertings([]);
                }
            })
            .catch((e) => {
                setValueConvertings([]);
                console.log(e);
            });
    }, []);

    const methods = useForm<IValueConvertingFormData>({
        defaultValues: props.existingValueConverting
            ? toFormData(props.existingValueConverting)
            : {},
    });

    const toTypeIdWatch = useWatch({
        control: methods.control,
        name: 'toTypeId',
    });

    function toFormData(valueConverting: IValueConverting): IValueConvertingFormData {
        // eslint-disable-next-line
        const withRemovedConvertingMap = (({ convertingMap, ...rest }) => rest)(valueConverting);
        return {
            ...withRemovedConvertingMap,
            fromApplicationId: String(valueConverting.fromApplicationId) as unknown as number,
            convertingArray: Object.entries(valueConverting.convertingMap).map(([key, value]) => {
                return { from: key, to: value };
            }),
        };
    }

    function toValueConverting(
        valueConvertingFormData: IValueConvertingFormData
    ): IValueConverting {
        // eslint-disable-next-line
        const withRemovedConvertingArray = (({ convertingArray, ...rest }) => rest)(
            valueConvertingFormData
        );
        const convertingMap: Record<string, string> = {};
        valueConvertingFormData.convertingArray.forEach(
            (entry: IValueConvertingConvertingArrayEntry) => {
                convertingMap[entry.from] = entry.to;
            }
        );
        return {
            ...withRemovedConvertingArray,
            fromApplicationId: Number(valueConvertingFormData.fromApplicationId),
            convertingMap,
        };
    }

    const onSubmit = (valueConvertingFormData: IValueConvertingFormData) => {
        const valueConverting: IValueConverting = toValueConverting(valueConvertingFormData);

        if (Object.keys(valueConverting.convertingMap).length > 0) {
            const saveRequest =
                props.isEdit && valueConverting.id
                    ? IntegrationConfigurationRepository.updateValueConverting(
                          valueConverting.id,
                          valueConverting
                      )
                    : IntegrationConfigurationRepository.createValueConverting(valueConverting);

            saveRequest
                .then(() => {
                    props.onSuccess({
                        severity: 'success',
                        message: props.isEdit ? t('updateSuccessfully') : t('saved'),
                    });
                })
                .catch(function (error) {
                    if (error.response?.status) {
                        props.onAlert({
                            severity: 'error',
                            message:
                                (props.isEdit ? t('updateError') : t('saveError')) +
                                (error.response.data.message
                                    ? error.response.data.message
                                    : t('genericError')) +
                                ', status: ' +
                                error.response.status,
                        });
                    }
                });
        } else {
            props.onAlert({
                severity: 'error',
                message: t('requiredConverting'),
            });
        }
    };

    function handleCancel() {
        if (props.setExistingValueConverting) {
            props.setExistingValueConverting(undefined);
            props.setNewValueConverting(false);
        }
    }

    return (
        <FormPageWrapper>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <VStack gap={'6'}>
                        <HStack gap={'2'} align="center">
                            <Heading size={'small'}>
                                {props.isEdit
                                    ? t('editValueConverting')
                                    : t('createValueConverting')}
                            </Heading>
                        </HStack>
                        <Box id={'name-container'}>
                            <Controller
                                rules={{
                                    required: t('requiredField'),
                                    validate: (value) => {
                                        if (
                                            props.isEdit &&
                                            value === props.existingValueConverting?.displayName
                                        ) {
                                            return true;
                                        }
                                        return (
                                            !valueConvertings?.includes(value) || t('uniqueField')
                                        );
                                    },
                                }}
                                name={'displayName'}
                                defaultValue={''}
                                render={({ field, fieldState }) => (
                                    <StringField
                                        {...field}
                                        disabled={!valueConvertings}
                                        displayName={t('displayName')}
                                        fieldState={fieldState}
                                    />
                                )}
                            />
                        </Box>
                        <VStack gap={'6'} id={'from-to-container'} className={styles.inputDefault}>
                            <Fieldset
                                legend={
                                    <DisplayNameWithHelpText
                                        displayName={t('from')}
                                        description={t('help.from')}
                                    />
                                }
                            >
                                <Controller
                                    rules={{
                                        required: { value: true, message: t('requiredField') },
                                    }}
                                    name={'fromApplicationId'}
                                    defaultValue={''}
                                    render={({ field, fieldState }) => (
                                        <SelectField
                                            {...field}
                                            fieldState={fieldState}
                                            displayName={t('fromApplicationId')}
                                            selectables={selectableSourceApplications.map(
                                                (fromApplicationId) => {
                                                    return {
                                                        displayName: fromApplicationId.label,
                                                        value: fromApplicationId.value,
                                                    };
                                                }
                                            )}
                                        />
                                    )}
                                />
                                <Controller
                                    rules={{
                                        required: { value: true, message: t('requiredField') },
                                    }}
                                    name={'fromTypeId'}
                                    defaultValue={''}
                                    render={({ field, fieldState }) => (
                                        <SelectField
                                            {...field}
                                            fieldState={fieldState}
                                            displayName={t('fromTypeId')}
                                            selectables={fromTypeIds.map((fromTypeId) => {
                                                return {
                                                    displayName: fromTypeId.label,
                                                    value: fromTypeId.value,
                                                };
                                            })}
                                        />
                                    )}
                                />
                            </Fieldset>
                            <Fieldset
                                legend={
                                    <DisplayNameWithHelpText
                                        displayName={t('to')}
                                        description={t('help.to')}
                                    />
                                }
                            >
                                <Controller
                                    rules={{
                                        required: { value: true, message: t('requiredField') },
                                    }}
                                    name={'toApplicationId'}
                                    defaultValue={''}
                                    render={({ field, fieldState }) => (
                                        <SelectField
                                            {...field}
                                            fieldState={fieldState}
                                            displayName={t('toApplicationId')}
                                            selectables={destinations.map((destination) => {
                                                return {
                                                    displayName: destination.label,
                                                    value: destination.value,
                                                };
                                            })}
                                        />
                                    )}
                                />
                                <Controller
                                    rules={{
                                        required: { value: true, message: t('requiredField') },
                                    }}
                                    name={'toTypeId'}
                                    defaultValue={''}
                                    render={({ field, fieldState }) => (
                                        <SelectField
                                            {...field}
                                            fieldState={fieldState}
                                            displayName={t('toTypeId')}
                                            selectables={toTypeIds.map((toTypeId) => {
                                                return {
                                                    displayName: toTypeId.label,
                                                    value: toTypeId.value,
                                                };
                                            })}
                                        />
                                    )}
                                />
                            </Fieldset>
                        </VStack>
                        <Fieldset
                            id={'value-convertings-container'}
                            legend={
                                <DisplayNameWithHelpText
                                    displayName={t('convertingMap')}
                                    description={t('help.convertingMap')}
                                />
                            }
                        >
                            <FieldArray
                                absoluteKey={'convertingArray'}
                                fieldComponentCreator={(index: number, absoluteKey: string) => (
                                    <HGrid columns={2} gap="5" key={index}>
                                        <Controller
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: t('requiredField'),
                                                },
                                            }}
                                            name={`${absoluteKey}.from`}
                                            defaultValue={''}
                                            render={({ field, fieldState }) => (
                                                <StringField
                                                    {...field}
                                                    displayName={t('from')}
                                                    multiline={true}
                                                    fieldState={fieldState}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                        <Controller
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: t('requiredField'),
                                                },
                                            }}
                                            name={`${absoluteKey}.to`}
                                            defaultValue={''}
                                            render={({ field, fieldState }) => {
                                                return toTypeIdWatch === 'text' ? (
                                                    <StringField
                                                        {...field}
                                                        displayName={t('to')}
                                                        multiline={true}
                                                        fieldState={fieldState}
                                                        fullWidth
                                                    />
                                                ) : (
                                                    <SearchField
                                                        {...field}
                                                        displayName={t('to')}
                                                        selectables={toSelectables}
                                                        fieldState={fieldState}
                                                        fullWidth
                                                    />
                                                );
                                            }}
                                        />
                                    </HGrid>
                                )}
                                defaultValueCreator={() => {
                                    return {
                                        from: '',
                                        to: '',
                                    };
                                }}
                            />
                        </Fieldset>
                        <HStack justify={'end'} id={'button-container'} gap={'4'}>
                            <Button
                                size={'small'}
                                as={RouterLink}
                                type={'button'}
                                variant={'secondary'}
                                id={'cancel-button'}
                                onClick={handleCancel}
                                to={'/valueconverting'}
                            >
                                {t('button.cancel')}
                            </Button>
                            <Button id={'submit-button'} type="submit" size={'small'}>
                                {props.isEdit ? t('button.save') : t('button.create')}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </FormProvider>
        </FormPageWrapper>
    );
};

export default ValueConvertingForm;
