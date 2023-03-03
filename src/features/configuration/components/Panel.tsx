import * as React from "react";
import {ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {FormEventHandler, useEffect, useState} from "react";
import {ISelectable} from "./FormPanel";
import {containsOnlyStaticUrls, getAbsoluteKey, updateSelectables} from "../util/FormUtils";
import {testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";

const Panel: React.FunctionComponent<any> = (props) => {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    const onChangeRegistry: Record<string, FormEventHandler<HTMLElement>> = {};

    function CreateStringValueComponent(parentRef: string, valueTemplate: IValueTemplate) {
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        return (
            <label>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(fullKey)}
                       onChange={onChangeRegistry[fullKey]}
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
            if (valueTemplate.template.selectablesSources
                && containsOnlyStaticUrls(valueTemplate.template.selectablesSources)) {
                updateSelectables(valueTemplate.template.selectablesSources.map(selectables => selectables.urlTemplate))
                    .then((result: any) => { setSelectables(result) })
            }
        }, [])

        return (
            <label>
                {valueTemplate.elementConfig.displayName}:
                <select {...register(fullKey)}
                        onChange={onChangeRegistry[fullKey]}
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
                       onChange={onChangeRegistry[fullKey]}
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