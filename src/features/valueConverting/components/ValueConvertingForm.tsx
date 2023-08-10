import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Alert, Box, Button, Snackbar} from "@mui/material";
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
import FlytTitle4Component from "../../configuration/components/common/title/FlytTitle4Component";
import {valueConvertingStyles} from "../../../util/styles/ValueConverting.styles";
import FlytTitle2Component from "../../configuration/components/common/title/FlytTitle2Component";
import SearchSelectValueComponent from "../../configuration/components/mapping/value/select/SearchSelectValueComponent";
import HelpPopover from "../../configuration/components/common/popover/HelpPopover";

const useStyles = valueConvertingStyles


type Props = {
    existingValueConverting: IValueConverting | undefined,
    setExistingValueConverting: React.Dispatch<React.SetStateAction<undefined>>,
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>,
    view: boolean
}
type IValueConvertingFormData = Omit<IValueConverting, 'convertingMap'> & {
    convertingArray: IValueConvertingConvertingArrayEntry[]
}

type IValueConvertingConvertingArrayEntry = { from: string, to: string }

export const ValueConvertingForm: React.FunctionComponent<Props> = (props: Props) => {
    const classes = useStyles();
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [disabled, setDisabled] = useState<boolean>(props.view);
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
        <Box className={classes.panelContainer}>
            <Box className={classes.headerContainer}>
                <FlytTitle2Component classes={classes} title={t('header')}/>
                <HelpPopover popoverContent={''} noMargin={true}/>
            </Box>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box className={classes.configurationBox} sx={{m: 1}}>
                        <Box sx={{mb: 2}}>
                            <Controller
                                name={"displayName"}
                                defaultValue={''}
                                render={({field}) =>
                                    <StringValueComponent
                                        {...field}
                                        classes={classes}
                                        disabled={disabled}
                                        displayName={t('displayName')}
                                    />
                                }
                            />
                        </Box>
                        <FlytTitle4Component classes={classes} title={'Fra'}/>
                        <Box sx={{height: '110px'}} className={classes.valueConvertingWrapper}>
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
                        </Box>
                        <FlytTitle4Component classes={classes} title={'Til'}/>
                        <Box sx={{height: '110px'}} className={classes.valueConvertingWrapper}>
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
                        </Box>
                        <FlytTitle4Component classes={classes} title={'Konvertering(er)'}/>
                        <div className={classes.wrapperVerticalMargin}>
                            <ArrayComponent
                                classes={classes}
                                absoluteKey={'convertingArray'}
                                disabled={disabled}
                                fieldComponentCreator={(index: number, absoluteKey: string) =>
                                    <Box sx={{display: 'flex', width: 'fit-content'}}>
                                        <Controller
                                            name={`${absoluteKey}.from`}
                                            defaultValue={''}
                                            render={({field}) =>
                                                <StringValueComponent
                                                    {...field}
                                                    disabled={disabled}
                                                    classes={classes}
                                                    displayName={t('from')}
                                                    multiline={true}
                                                />
                                            }
                                        />
                                        <Controller
                                            name={`${absoluteKey}.to`}
                                            defaultValue={''}
                                            render={({field}) => {
                                                return toTypeIdWatch === 'text'
                                                    ? <StringValueComponent
                                                        {...field}
                                                        classes={classes}
                                                        disabled={disabled}
                                                        displayName={t('to')}
                                                        multiline={true}
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
                        </div>
                    </Box>
                    <Box sx={{mt: 2}}>
                        {!disabled &&
                            <button
                                id={'submit-button'}
                                className={classes.submitButton}
                                type="submit"
                            >
                                Opprett
                            </button>}
                        <Button id={'cancel-button'} className={classes.submitButton} onClick={handleCancel}
                                size="medium"
                                variant="contained" component={RouterLink}
                                to={'/valueconverting'}>Avbryt</Button>
                    </Box>
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