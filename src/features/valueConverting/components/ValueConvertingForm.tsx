import { Button, Heading, HelpText, HStack, VStack } from '@navikt/ds-react';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';

import useResourceRepository from '../../../shared/api/useResourceRepository';
import useValueConvertingRepository from '../../../shared/api/useValueConvertingRepository';
import FormPageWrapper from '../../../shared/components/layout/FormPageWrapper';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import {
    destinations,
    fromTypeIds,
    toTypeIds,
} from '../../../shared/defaults/valueConvertingTypes';
import { IAlertContent } from '../../../shared/types/AlertContent';
import { ISelect } from '../../../shared/types/Select';
import { sourceApplicationsToSelectable } from '../../../shared/util/FormUtil';
import ArrayComponent from '../../configuration/components/array/ArrayComponent';
import SearchSelectValueComponent from '../../configuration/components/mapping/value/select/SearchSelectValueComponent';
import SelectValueComponent from '../../configuration/components/mapping/value/select/SelectValueComponent';
import StringValueComponent from '../../configuration/components/mapping/value/string/StringValueComponent';
import { ISelectable } from '../../configuration/types/Selectable';
import { sortAndHandleSelectables } from '../../configuration/util/SelectablesUtils';
import { IValueConverting } from '../types/ValueConverting';

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
    const ValueConvertingRepository = useValueConvertingRepository();
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
            const sortedResult = sortAndHandleSelectables(result.data);
            setToSelectables(sortedResult);
        });

        ValueConvertingRepository.getValueConvertings({
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
                    ? ValueConvertingRepository.updateValueConverting(
                          valueConverting.id,
                          valueConverting
                      )
                    : ValueConvertingRepository.createValueConverting(valueConverting);

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
                        <VStack gap={'3'} id={'name-container'}>
                            <HStack gap={'2'} align="center">
                                <Heading size={'small'}>{t('valueConvertingName')}</Heading>
                                <HelpText title="Hva er dette?" placement="bottom">
                                    {t('help.valueConvertingName')}
                                </HelpText>
                            </HStack>
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
                                    <StringValueComponent
                                        {...field}
                                        disabled={!valueConvertings}
                                        displayName={t('displayName')}
                                        fieldState={fieldState}
                                    />
                                )}
                            />
                        </VStack>
                        <HStack gap={'6'} id={'from-to-container'}>
                            <VStack gap={'3'}>
                                <HStack gap={'2'} align="center">
                                    <Heading size={'small'}>{t('from')}</Heading>
                                    <HelpText title="Hva er dette?" placement="bottom">
                                        {t('help.from')}
                                    </HelpText>
                                </HStack>
                                <VStack gap={'3'}>
                                    <Controller
                                        rules={{
                                            required: { value: true, message: t('requiredField') },
                                        }}
                                        name={'fromApplicationId'}
                                        defaultValue={''}
                                        render={({ field, fieldState }) => (
                                            <SelectValueComponent
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
                                            <SelectValueComponent
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
                                </VStack>
                            </VStack>
                            <VStack gap={'3'}>
                                <HStack gap={'2'} align="center">
                                    <Heading size={'small'}>{t('to')}</Heading>
                                    <HelpText title="Hva er dette?" placement="bottom">
                                        {t('help.to')}
                                    </HelpText>
                                </HStack>
                                <VStack gap={'3'}>
                                    <Controller
                                        rules={{
                                            required: { value: true, message: t('requiredField') },
                                        }}
                                        name={'toApplicationId'}
                                        defaultValue={''}
                                        render={({ field, fieldState }) => (
                                            <SelectValueComponent
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
                                            <SelectValueComponent
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
                                </VStack>
                            </VStack>
                        </HStack>
                        <VStack gap={'3'} id={'value-convertings-container'}>
                            <HStack gap={'2'} align="center">
                                <Heading id={'value-convertings-header'} size={'small'}>
                                    {t('convertingMap')}
                                </Heading>
                                <HelpText title="Konverteringer informasjon" placement="bottom">
                                    {t('help.convertingMap')}
                                </HelpText>
                            </HStack>
                            <ArrayComponent
                                absoluteKey={'convertingArray'}
                                fieldComponentCreator={(index: number, absoluteKey: string) => (
                                    <HStack gap={'6'} wrap={false}>
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
                                                <StringValueComponent
                                                    {...field}
                                                    displayName={t('from')}
                                                    multiline={true}
                                                    fieldState={fieldState}
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
                                                    <StringValueComponent
                                                        {...field}
                                                        displayName={t('to')}
                                                        multiline={true}
                                                        fieldState={fieldState}
                                                    />
                                                ) : (
                                                    <SearchSelectValueComponent
                                                        {...field}
                                                        displayName={t('to')}
                                                        selectables={toSelectables}
                                                        fieldState={fieldState}
                                                    />
                                                );
                                            }}
                                        />
                                    </HStack>
                                )}
                                defaultValueCreator={() => {
                                    return {
                                        from: '',
                                        to: '',
                                    };
                                }}
                            />
                        </VStack>
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
