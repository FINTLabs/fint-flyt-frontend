import React from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useTranslation} from 'react-i18next';
import {configurationFormStyles} from "../../configuration/styles/ConfigurationForm.styles";
import {Controller, FormProvider, useForm} from "react-hook-form";
import SelectValueComponent from "../../configuration/components/mapping/value/select/SelectValueComponent";
import {
    fromApplicationIds,
    fromTypeIds,
    fromTypes,
    toApplicationIds,
    toTypeIds,
    toTypes
} from "../../configuration/defaults/DefaultValues";
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import StringValueComponent from "../../configuration/components/mapping/value/string/StringValueComponent";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {IValueConverting} from "../types/ValueConverting";

const useStyles = configurationFormStyles

type Props = {
    existingValueConverting: IValueConverting,
    setExistingValueConverting: any
}

export const ValueConvertingForm: React.FunctionComponent<any> = (props: Props) => {
    const classes = useStyles();
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const disabled: boolean = !!props.existingValueConverting;
    const [counter, setCounter] = React.useState(0);
    const [indexes, setIndexes] = React.useState([]);


    const addConverting = () => {
        // @ts-ignore
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    const removeConverting = (index: any) => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    const methods = useForm<IValueConverting>(
        {
            defaultValues: props.existingValueConverting ?
                props.existingValueConverting : {}
        }
    );

    function toConverts(data: any): Record<string, string> {
        let rec: Record<string, string> = {};
        console.log(data)
        data.map((convert: any) => {
            rec[convert.from] = convert.to;
        })
        console.log(rec)
        return rec;

    }

    const onSubmit = (data: any) => {
        data.convertingMap = toConverts(data.convertingMap)
        console.log(data);
        ValueConvertingRepository.createValueConverting(data).then(r => console.log(r))
            .catch(e => console.log(e))
    }

    function handleCancel() {
        if (props.setExistingValueConverting) {
            props.setExistingValueConverting(undefined)
        }
    }

    console.log(props.existingValueConverting ? props.existingValueConverting : "hei")

    return (
        <Box className={classes.panelContainer}>
            <h2 className={classes.title2} id="value-converting-header">{t('header')}</h2>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box className={classes.configurationBox} sx={{m: 1}}>
                        <Controller
                            name={"displayName".toString()}
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
                        <h4 style={{marginTop: '16px'}} className={classes.title4} id="from-value-header">Fra</h4>
                        <Controller
                            name={"fromApplicationId".toString()}
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
                            name={"fromTypeId".toString()}
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
                        <h4 style={{marginTop: '16px'}} className={classes.title4} id="from-value-header">Til</h4>
                        <Controller
                            name={"toApplicationId".toString()}
                            defaultValue={''}
                            render={({field}) =>
                                <SelectValueComponent
                                    {...field}
                                    disabled={disabled}
                                    displayName={t('toApplicationId')}
                                    selectables={
                                        toApplicationIds.map(toApplicationId => {
                                            return {
                                                displayName: toApplicationId.label,
                                                value: toApplicationId.value
                                            }
                                        })}
                                />
                            }
                        />
                        <Controller
                            name={"toTypeId".toString()}
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
                        <h4 style={{marginTop: '32px'}} className={classes.title4}
                            id="from-value-header">Konvertering(er)</h4>
                        {disabled && props.existingValueConverting?.convertingMap &&
                            <div>
                                {Object.keys(props.existingValueConverting.convertingMap).map((k) => {
                                    return <Typography>{k + ' --> ' + props.existingValueConverting.convertingMap[k]}</Typography>
                                })}
                            </div>}

                        {indexes.map(index => {
                            const fieldName = `convertingMap[${index}]`;
                            return (
                                <Box sx={{display: 'flex', width: '500px'}}>
                                    <Controller
                                        name={`${fieldName}.from`}
                                        defaultValue={''}
                                        render={({field}) =>
                                            <SelectValueComponent
                                                {...field}
                                                disabled={disabled}
                                                displayName={t('from')}
                                                selectables={
                                                    fromTypes.map(type => {
                                                        return {
                                                            displayName: type.label,
                                                            value: type.value
                                                        }
                                                    })}
                                            />
                                        }
                                    />
                                    <Controller
                                        name={`${fieldName}.to`}
                                        defaultValue={''}
                                        render={({field}) =>
                                            <SelectValueComponent
                                                {...field}
                                                disabled={disabled}
                                                displayName={t('to')}
                                                selectables={
                                                    toTypes.map(type => {
                                                        return {
                                                            displayName: type.label,
                                                            value: type.value
                                                        }
                                                    })}
                                            />
                                        }
                                    />
                                    {!disabled &&
                                        <IconButton onClick={removeConverting(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                </Box>
                            );
                        })}
                        <Box sx={{mt: 2}}>
                            {!disabled &&
                                <IconButton onClick={addConverting}>
                                    <AddIcon/>
                                </IconButton>
                            }
                        </Box>
                    </Box>
                    <Box sx={{mt: 2}}>
                        {!disabled &&
                            <button className={classes.submitButton} type="submit" onClick={onSubmit}>Opprett</button>}
                        <Button className={classes.submitButton} onClick={handleCancel} size="medium"
                                variant="contained" component={RouterLink}
                                to={'/valueconverting'}>Avbryt</Button>
                    </Box>
                </form>

            </FormProvider>

        </Box>
    );
}

export default withRouter(ValueConvertingForm);