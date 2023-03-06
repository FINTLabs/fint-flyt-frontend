import * as React from "react";
import {ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {ISelectable} from "./FormPanel";
import {containsOnlyStaticUrls, createSource, getAbsoluteKey, updateSelectables} from "../util/FormUtils";
import {testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";

import {Subject} from "rxjs";

const Panel: React.FunctionComponent<any> = (props) => {

    const { register, handleSubmit, getValues } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    const onChangeRegistry: Record<string, Subject<void>> = {};

    function CreateStringValueComponent(parentRef: string, valueTemplate: IValueTemplate) {
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        return (
            <label key={fullKey}>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(fullKey)}
                       onBlur={(e) => onChangeRegistry[fullKey].next()}
                />
            </label>
        )
    }

    function CreateSelectValueComponent(parentRef: string, valueTemplate: ISelectableValueTemplate) {
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        const [selectables, setSelectables] = useState<ISelectable[]>(
            valueTemplate.template.selectablesSources
                ? []
                : valueTemplate.template.selectables ? valueTemplate.template.selectables : []
        )

        useEffect(() => {
            if (valueTemplate.template.selectablesSources) {
                if (containsOnlyStaticUrls(valueTemplate.template.selectablesSources)) {
                    updateSelectables(valueTemplate.template.selectablesSources
                        .map(selectable => ({url: selectable.urlTemplate})))
                        .then((result: any) => {
                            setSelectables(result)
                        })
                } else {
                    valueTemplate.template.selectablesSources.forEach(urlBuilder => {
                        if (urlBuilder.valueKeyPerRequestParamKey) {
                            Object.keys(urlBuilder.valueKeyPerRequestParamKey).forEach(key => {
                                onChangeRegistry[key].subscribe(() => {
                                    if (valueTemplate.template.selectablesSources) {
                                        updateSelectables(valueTemplate.template.selectablesSources
                                            .map(urlBuilder => createSource(urlBuilder, getValues, parentRef))
                                        ).then((result: any) => {
                                            setSelectables(result)
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
            }
        }, [])

        return (
            <label key={fullKey}>
                {valueTemplate.elementConfig.displayName}:
                <select {...register(fullKey)}
                        onChange={(e) => onChangeRegistry[fullKey].next()}
                        autoComplete={valueTemplate.template.type === 'SEARCH_SELECT' ? 'on' : 'off'}
                >
                    {selectables.map(option => {
                        return (
                            <option key={option.displayName} value={option.value}>
                                {option.displayName}
                            </option>
                        )
                    })}
                </select>
            </label>
        )
    }

    function createDynamicStringValueComponent(parentRef: string, valueTemplate: IValueTemplate) {
        // return input field supporting onChange on drop appending dropped value
        console.log(parentRef, valueTemplate)
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        return (
            <label>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(fullKey)}
                       onBlur={(e) => onChangeRegistry[fullKey].next()}
                />
            </label>
        )
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset style={{display: "grid"}}>
                    {testStringTemplates.map(testTemplate => {
                        return CreateStringValueComponent('sak', testTemplate)
                    })}
                    {testStringTemplates.map(testTemplate => {
                        return CreateStringValueComponent('sak.journalpost', testTemplate)
                    })}
                    {testSelectTemplates.map(testSelectTemplate => {
                        return CreateSelectValueComponent('sak', testSelectTemplate)
                    })}
                </fieldset>
                <input type="submit" />
            </form>
        </>
    );
}
export default Panel;