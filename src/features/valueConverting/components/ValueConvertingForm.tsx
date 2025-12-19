import React, {useContext, useEffect, useState} from "react";
import {Link as RouterLink} from "react-router";
import {useTranslation} from "react-i18next";
import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";
import SelectValueComponent from "../../configuration/components/mapping/value/select/SelectValueComponent";
import {defaultAlert, destinations, fromTypeIds, toTypeIds,} from "../../configuration/defaults/DefaultValues";
import StringValueComponent from "../../configuration/components/mapping/value/string/StringValueComponent";
import {IValueConverting} from "../types/ValueConverting";
import {IAlertContent} from "../../configuration/types/AlertContent";
import { sortAndHandleSelectables } from '../../configuration/util/SelectablesUtils';
import {ISelectable} from "../../configuration/types/Selectable";
import ArrayComponent from "../../configuration/components/common/array/ArrayComponent";
import SearchSelectValueComponent from "../../configuration/components/mapping/value/select/SearchSelectValueComponent";
import {Alert, Box, Button, Heading, HelpText, HStack, VStack,} from "@navikt/ds-react";
import {ISelect} from "../../configuration/types/Select";
import {AuthorizationContext} from "../../../context/AuthorizationContext";
import {getSourceApplicationDisplayNameById} from "../../../util/TableUtil";
import useValueConvertingRepository from '../../../api/useValueConvertingRepository';
import useResourceRepository from '../../../api/useResourceRepository';
import FormPageWrapper from '../../../components/molecules/FormPageWrapper';

type Props = {
    existingValueConverting: IValueConverting | undefined;
    setExistingValueConverting: React.Dispatch<React.SetStateAction<IValueConverting | undefined>>;
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>;
};
type IValueConvertingFormData = Omit<IValueConverting, "convertingMap"> & {
    convertingArray: IValueConvertingConvertingArrayEntry[];
};

type IValueConvertingConvertingArrayEntry = { from: string; to: string };

export const ValueConvertingForm: React.FunctionComponent<Props> = (props: Props) => {
    const ValueConvertingRepository = useValueConvertingRepository()
    const ResourceRepository = useResourceRepository()

    const {t} = useTranslation("translations", {keyPrefix: "pages.valueConverting",});
    const {activeUserSourceApps} = useContext(AuthorizationContext)
    const [disabled, setDisabled] = useState<boolean>(false);
    const [show, setShow] = React.useState(false);
    const [alertContent, setAlertContent] = React.useState<IAlertContent>(defaultAlert);
    const [toSelectables, setToSelectables] = useState<ISelectable[]>([]);
    const [selectableSourceApplications, setSelectableSourceApplications] = useState<ISelect[]>([])
    const [valueConvertings, setValueConvertings] = useState<string[] | undefined>(undefined)


    function getSelectableSourceApplications() {
        const sources: ISelect[] = []
        activeUserSourceApps && activeUserSourceApps
            .map((sourceApplication) => {
                sources.push({value: sourceApplication, label: getSourceApplicationDisplayNameById(sourceApplication)})
            })
        setSelectableSourceApplications([...selectableSourceApplications, ...sources]);
    }


    useEffect(() => {
        getSelectableSourceApplications()
        ResourceRepository.getSelectableKodeverkFormat().then((result => {
            const sortedResult = sortAndHandleSelectables(result.data)
            setToSelectables(sortedResult);
        }))

        ValueConvertingRepository.getValueConvertings(0, 1000, 'id', 'DESC', true)
            .then(response => {
                const data: IValueConverting[] = response.data.content
                if (data) {
                    setValueConvertings(data.map(vc => vc.displayName))
                } else {
                    setValueConvertings([])
                }
            })
            .catch(e => {
                setValueConvertings([])
                console.log(e)
            })
    }, []);

    const methods = useForm<IValueConvertingFormData>({
        defaultValues: props.existingValueConverting
            ? toFormData(props.existingValueConverting)
            : {},
    });

    const toTypeIdWatch = useWatch({
        control: methods.control,
        name: "toTypeId",
    });

    function toFormData(
        valueConverting: IValueConverting
    ): IValueConvertingFormData {
        // eslint-disable-next-line
        const withRemovedConvertingMap = (({convertingMap, ...rest}) => rest)(
            valueConverting
        );
        return {
            ...withRemovedConvertingMap,
            convertingArray: Object.entries(valueConverting.convertingMap).map(
                ([key, value]) => {
                    return {from: key, to: value};
                }
            ),
        };
    }

    function toValueConverting(
        valueConvertingFormData: IValueConvertingFormData
    ): IValueConverting {
        // eslint-disable-next-line
        const withRemovedConvertingArray = (({convertingArray, ...rest}) => rest)(
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
            convertingMap,
        };
    }

    const onSubmit = (valueConvertingFormData: IValueConvertingFormData) => {
        const valueConverting: IValueConverting = toValueConverting(
            valueConvertingFormData
        );

        if (Object.keys(valueConverting.convertingMap).length > 0) {
            ValueConvertingRepository.createValueConverting(valueConverting)
                .then((r) => {
                    console.log(r);
                    setDisabled(true);
                    setShow(true);
                    setAlertContent({
                        severity: "success",
                        message: t('saved'),
                    });
                })
                .catch(function (error) {
                    if (error.response?.status) {
                        setAlertContent({
                            severity: "error",
                            message: t('saveError') +
                                (error.response.data.message
                                    ? error.response.data.message
                                    : t('genericError')) +
                                ", status: " +
                                error.response.status
                        });
                        setShow(true);
                    }
                });
        } else {
            setAlertContent({
                severity: "error",
                message: t('requiredConverting')
            });
            setShow(true);
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
                                    validate: (value) =>
                                        !valueConvertings?.includes(value) || t('uniqueField'),
                                }}
                                name={'displayName'}
                                defaultValue={''}
                                render={({ field, fieldState }) => (
                                    <StringValueComponent
                                        {...field}
                                        disabled={disabled || !valueConvertings}
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
                                                disabled={disabled}
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
                                                disabled={disabled}
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
                                                disabled={disabled}
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
                                                disabled={disabled}
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
                                disabled={disabled}
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
                                                    disabled={disabled}
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
                                                        disabled={disabled}
                                                        displayName={t('to')}
                                                        multiline={true}
                                                        fieldState={fieldState}
                                                    />
                                                ) : (
                                                    <SearchSelectValueComponent
                                                        {...field}
                                                        disabled={disabled}
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
                        {show && (
                            <Alert
                                size={'small'}
                                closeButton
                                onClose={() => {
                                    setShow(false);
                                    setAlertContent(defaultAlert);
                                }}
                                variant={alertContent.severity}
                            >
                                {alertContent.message}
                            </Alert>
                        )}
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
                                {disabled ? t('button.back') : t('button.cancel')}
                            </Button>
                            <Button
                                id={'submit-button'}
                                type="submit"
                                disabled={disabled}
                                size={'small'}
                            >
                                {t('button.create')}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </FormProvider>
        </FormPageWrapper>
    );
};

export default ValueConvertingForm;
