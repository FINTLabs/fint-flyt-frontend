import * as React from "react";
import {IElementConfig, ISelectableValueTemplate, IUrlBuilder, IValueTemplate} from "../types/NewForm/FormTemplate";
import {registerSource} from "react-dnd/lib/internals";
import {useForm} from "react-hook-form";
import {FormEventHandler, useState} from "react";
import {contextDefaultValues, IResourceItem} from "../../../context/resourcesContext/types";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {ISelectable} from "./FormPanel";

const Panel: React.FunctionComponent<any> = (props) => {

    const { register, handleSubmit } = useForm();

    const onChangeRegistry: Record<string, FormEventHandler<HTMLElement>> = {};

    function containsOnlyStaticUrls(selectableSources: IUrlBuilder[]): boolean {
        return selectableSources.every(isStaticUrl)
    }

    function isStaticUrl(builder: IUrlBuilder): boolean {
        return (builder.valueKeyPerPathParamKey ? Object.keys(builder.valueKeyPerPathParamKey).length === 0 : true)
            && (builder.valueKeyPerRequestParamKey ? Object.keys(builder.valueKeyPerRequestParamKey).length === 0 : true)
    }

    function updateSelectables(sources: string[], setter: Function) {
        return Promise.all(
            sources.map(source =>
                ResourceRepository.getResource(source)
                    .then(response => {
                        let list: IResourceItem[] = [];
                        let data = response.data;
                        if (data) {
                            data.sort((a: any, b: any) => {
                                if (a.displayName < b.displayName) {
                                    return -1;
                                }
                                return data;
                            });
                            data.map((resource: any) => list.push({label: resource.displayName, value: resource.id}))
                            return list;
                        }
                    })
            )).then(result => setter(result.flat())
        ).catch((err) => {
            console.error(err);
        })

        // get kodeverk based on source
    }

    function getAbsoluteKey(parentRef: string, elementConfig: IElementConfig) {
        return (parentRef ? parentRef + '.' : '') + elementConfig.key
    }

    function createStringValueComponent(parentRef: string, valueTemplate: IValueTemplate) {
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        return (
            <label>
                {valueTemplate.elementConfig.displayName}
                <input type="text"
                       {...register(fullKey)}
                       onChange={onChangeRegistry[fullKey]}
                />
            </label>
        )
    }

    function createSelectValueComponent(parentRef: string, valueTemplate: ISelectableValueTemplate) {

        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        const [selectables, setSelectables] = useState<ISelectable[]>(
            valueTemplate.template.selectablesSources
                ? []
                : valueTemplate.template.selectables ? valueTemplate.template.selectables : []
        )
        if (valueTemplate.template.selectablesSources
            && containsOnlyStaticUrls(valueTemplate.template.selectablesSources)) {
            updateSelectables(
                valueTemplate.template.selectablesSources.map(selectables => selectables.urlTemplate),
                setSelectables
            )
        }



        return (
            <label>
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
    }


    return (
        <></>
    );
}
export default Panel;