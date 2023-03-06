import {ISelectableValueTemplate, IUrlBuilder} from "../types/NewForm/FormTemplate";
import {AxiosRequestConfig} from "axios";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {ISelectable} from "../components/FormPanel";
import {containsOnlyStaticUrls, getAbsoluteKeyFromReference} from "./FormUtils";
import {useEffect, useState} from "react";
import {UseFormGetValues} from "react-hook-form/dist/types/form";
import {FieldValues} from "react-hook-form";
import {Observable} from "rxjs";


export function createSelectables(
    parentRef: string,
    valueTemplate: ISelectableValueTemplate,
    getValues: UseFormGetValues<FieldValues>,
    elementUpdatedObservablePerAbsoluteKey: Record<string, Observable<void>>
): ISelectable[] {
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
                            elementUpdatedObservablePerAbsoluteKey[key].subscribe(() => {
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
    return selectables
}

export function createSource(urlBuilder: IUrlBuilder, getValues: Function, parentRef?: string): { url: string, config?: AxiosRequestConfig } {
    let params: Record<string, string> = {};
    let url: string = urlBuilder.urlTemplate;
    if (urlBuilder.valueKeyPerRequestParamKey) {
        Object.entries(urlBuilder.valueKeyPerRequestParamKey)
            .forEach(([requestParamKey, valueKey]) =>
                params[requestParamKey] = getValues(getAbsoluteKeyFromReference(valueKey, parentRef)));
    }
    if (urlBuilder.valueKeyPerPathParamKey) {
        Object.entries(urlBuilder.valueKeyPerPathParamKey)
            .forEach(([pathParamKey, valueKey]) => {
                url = url.replace('{' + pathParamKey + '}', getValues(getAbsoluteKeyFromReference(valueKey, parentRef)))
            })
    }
    return {url: url, config: {params: params}};
}

export function updateSelectables(sources: { url: string, config?: AxiosRequestConfig }[]) {
    return Promise.all(
        sources.map(source =>
            ResourceRepository.getSelectables('/' + source.url, source.config)
                .then(response => {
                    let list: ISelectable[] = [];
                    let data = response.data;
                    if (data) {
                        data.sort((a: ISelectable, b: ISelectable) => {
                            if (a.displayName < b.displayName) {
                                return -1;
                            }
                            return 1;
                        });
                        data.map((resource: any) => list.push({displayName: resource.displayName, value: resource.id}))
                        return list;
                    }
                })
        )).then(result => {
            return result !== undefined ? result.flat() : []
        }
    ).catch((err) => {
        console.error(err);
        return [];
    })

}
