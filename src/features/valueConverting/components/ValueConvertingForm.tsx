import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Snackbar} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {Controller, FormProvider, useForm, useWatch} from "react-hook-form";
import SelectValueComponent from "../../configuration/components/mapping/value/select/SelectValueComponent";
import {
    defaultAlert,
    destinations,
    fromApplicationIds,
    fromTypeIds,
    toTypeIds
} from "../../configuration/defaults/DefaultValues";
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import StringValueComponent from "../../configuration/components/mapping/value/string/StringValueComponent";
import {IValueConverting} from "../types/ValueConverting";
import {IAlertContent} from "../../configuration/types/AlertContent";
import getSelectables from "../../configuration/util/SelectablesUtils";
import {ISelectable} from "../../configuration/types/Selectable";
import ArrayComponent from "../../configuration/components/common/array/ArrayComponent";
import {valueConvertingStyles} from "../../../util/styles/ValueConverting.styles";
import SearchSelectValueComponent from "../../configuration/components/mapping/value/select/SearchSelectValueComponent";
import {Box, Heading, HStack, VStack, Button} from "@navikt/ds-react";

const useStyles = valueConvertingStyles

type Props = {
    existingValueConverting: IValueConverting | undefined,
    setExistingValueConverting: React.Dispatch<React.SetStateAction<undefined>>,
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>,
}
type IValueConvertingFormData = Omit<IValueConverting, 'convertingMap'> & {
    convertingArray: IValueConvertingConvertingArrayEntry[]
}

type IValueConvertingConvertingArrayEntry = { from: string, to: string }

export const ValueConvertingForm: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [disabled, setDisabled] = useState<boolean>(false);
    const [showAlert, setShowAlert] = React.useState<boolean>(false)
    const [alertContent, setAlertContent] = React.useState<IAlertContent>(defaultAlert)

    const [toSelectables, setToSelectables] = useState<ISelectable[]>([])

    useEffect(() => {
        getSelectables([{
            url: "api/intern/arkiv/kodeverk/format"
        }])
            .then((result: ISelectable[]) => {
                setToSelectables(result);
            })
    }, [])

    const methods = useForm<IValueConvertingFormData>(
        {
            defaultValues: props.existingValueConverting ?
                toFormData(props.existingValueConverting) : {}
        }
    );

    const toTypeIdWatch = useWatch({control: methods.control, name: 'toTypeId'})

    function toFormData(valueConverting: IValueConverting): IValueConvertingFormData {
        // eslint-disable-next-line
        const withRemovedConvertingMap = (({convertingMap, ...rest}) => rest)(valueConverting);
        return {
            ...withRemovedConvertingMap,
            convertingArray: Object.entries(valueConverting.convertingMap)
                .map(([key, value]) => {
                    return {from: key, to: value}
                })
        }
    }

    function toValueConverting(valueConvertingFormData: IValueConvertingFormData): IValueConverting {
        // eslint-disable-next-line
        const withRemovedConvertingArray = (({convertingArray, ...rest}) => rest)(valueConvertingFormData);
        const convertingMap: Record<string, string> = {}
        valueConvertingFormData.convertingArray
            .forEach((entry: IValueConvertingConvertingArrayEntry) => {
                convertingMap[entry.from] = entry.to;
            })
        return {
            ...withRemovedConvertingArray,
            convertingMap
        }
    }

    const onSubmit = (valueConvertingFormData: IValueConvertingFormData) => {
        const valueConverting: IValueConverting = toValueConverting(valueConvertingFormData);
        ValueConvertingRepository.createValueConverting(valueConverting).then(r => {
            console.log(r)
            setDisabled(true)
            setShowAlert(true)
            setAlertContent({
                severity: 'success',
                message: 'verdikonvertering lagret'
            })
        })
            .catch(function (error) {
                if (error.response?.status) {
                    setAlertContent({
                        severity: 'error',
                        message: 'Feilet under lagring, feilmelding: ' + (error.response.data.message ? error.response.data.message : 'Det har oppstått en feil') + ', status: ' + error.response.status
                    })
                    setShowAlert(true);
                }
            })
    }

    function handleCancel() {
        if (props.setExistingValueConverting) {
            props.setExistingValueConverting(undefined)
            props.setNewValueConverting(false)
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
        setAlertContent(defaultAlert)
    };

    return (
        <Box background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
             borderColor={"border-subtle"}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box>
                        <Controller
                            name={"displayName"}
                            defaultValue={''}
                            render={({field, fieldState}) =>
                                <StringValueComponent
                                    {...field}
                                    classes={classes}
                                    disabled={disabled}
                                    displayName={t('displayName')}
                                    fieldState={fieldState}
                                />
                            }
                        />

                        <HStack gap={"6"}>
                            <VStack>
                                <Heading size={"small"}>{t('from')}</Heading>
                                <Controller
                                    name={"fromApplicationId"}
                                    defaultValue={''}
                                    render={({field}) =>
                                        <SelectValueComponent
                                            {...field}
                                            disabled={disabled}
                                            displayName={t('fromApplicationId')}
                                            selectables={
                                                fromApplicationIds.map(fromApplicationId => {
                                                    return {
                                                        displayName: fromApplicationId.label,
                                                        value: fromApplicationId.value
                                                    }
                                                })}
                                        />
                                    }
                                />
                                <Controller
                                    name={"fromTypeId"}
                                    defaultValue={''}
                                    render={({field}) =>
                                        <SelectValueComponent
                                            {...field}
                                            disabled={disabled}
                                            displayName={t('fromTypeId')}
                                            selectables={
                                                fromTypeIds.map(fromTypeId => {
                                                    return {
                                                        displayName: fromTypeId.label,
                                                        value: fromTypeId.value
                                                    }
                                                })}
                                        />
                                    }
                                />
                            </VStack>
                            <VStack>
                                <Heading size={"small"}>{t('to')}</Heading>
                                <Controller
                                    name={"toApplicationId"}
                                    defaultValue={''}
                                    render={({field}) =>
                                        <SelectValueComponent
                                            {...field}
                                            disabled={disabled}
                                            displayName={t('toApplicationId')}
                                            selectables={
                                                destinations.map(destination => {
                                                    return {
                                                        displayName: destination.label,
                                                        value: destination.value
                                                    }
                                                })}
                                        />
                                    }
                                />
                                <Controller
                                    name={"toTypeId"}
                                    defaultValue={''}
                                    render={({field}) =>
                                        <SelectValueComponent
                                            {...field}
                                            disabled={disabled}
                                            displayName={t('toTypeId')}
                                            selectables={
                                                toTypeIds.map(toTypeId => {
                                                    return {
                                                        displayName: toTypeId.label,
                                                        value: toTypeId.value
                                                    }
                                                })}
                                        />
                                    }
                                />
                            </VStack>
                        </HStack>
                    </Box>
                    <Box>
                        <Heading size={"small"}>{t('convertingMap')}</Heading>
                        <ArrayComponent
                            classes={classes}
                            absoluteKey={'convertingArray'}
                            disabled={disabled}
                            fieldComponentCreator={(index: number, absoluteKey: string) =>
                                <Box sx={{display: 'flex', width: 'fit-content'}}>
                                    <Controller
                                        name={`${absoluteKey}.from`}
                                        defaultValue={''}
                                        render={({field, fieldState}) =>
                                            <StringValueComponent
                                                {...field}
                                                disabled={disabled}
                                                classes={classes}
                                                displayName={t('from')}
                                                multiline={true}
                                                fieldState={fieldState}
                                            />
                                        }
                                    />
                                    <Controller
                                        name={`${absoluteKey}.to`}
                                        defaultValue={''}
                                        render={({field, fieldState}) => {
                                            return toTypeIdWatch === 'text'
                                                ? <StringValueComponent
                                                    {...field}
                                                    classes={classes}
                                                    disabled={disabled}
                                                    displayName={t('to')}
                                                    multiline={true}
                                                    fieldState={fieldState}
                                                />
                                                : <SearchSelectValueComponent
                                                    {...field}
                                                    disabled={disabled}
                                                    displayName={t('to')}
                                                    selectables={toSelectables}
                                                />
                                        }}
                                    />
                                </Box>
                            }
                            defaultValueCreator={() => {
                                return {
                                    from: '',
                                    to: ''
                                }
                            }}
                        />
                    </Box>
                    <HStack gap={"6"}>
                        <Button
                            id={'submit-button'}
                            type="submit"
                            disabled={disabled
                            }>{t('button.create')}
                        </Button>
                        <Button
                            as={RouterLink}
                            id={'cancel-button'}
                            onClick={handleCancel}
                            to={'/valueconverting'}
                        >{t('button.cancel')}
                        </Button>
                    </HStack>
                    <Snackbar id="integration-form-snackbar-saved" autoHideDuration={4000} open={showAlert}
                              onClose={handleClose}>
                        <Alert onClose={handleClose} severity={alertContent.severity} sx={{width: '100%'}}>
                            {alertContent.message}
                        </Alert>
                    </Snackbar>
                </form>
            </FormProvider>
        </Box>
    );
}

export default ValueConvertingForm;