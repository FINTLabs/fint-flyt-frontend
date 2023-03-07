import {ISelectableValueTemplate, IUrlBuilder} from "../types/NewForm/FormTemplate";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {ISelectable} from "../components/FormPanel";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UseFormGetValues} from "react-hook-form/dist/types/form";
import {FieldValues} from "react-hook-form";
import {Observable, Subscription} from "rxjs";
import {containsOnlyStaticUrls, createSource, Source} from "./UrlUtils";
import {getAbsoluteKeyFromValueRef} from "./KeyUtils";


export function createSelectables(
    parentAbsoluteKey: string,
    valueTemplate: ISelectableValueTemplate,
    getValue: UseFormGetValues<FieldValues>,
    elementUpdatedObservablePerAbsoluteKey: Record<string, Observable<void>>
): ISelectable[] {

    const [selectables, setSelectables] = useState<ISelectable[]>(
        valueTemplate.template.selectablesSources
            ? []
            : valueTemplate.template.selectables ? valueTemplate.template.selectables : []
    )

    useEffect(() => {
        if (valueTemplate.template.selectablesSources) {
            let sourceUrlBuilders = valueTemplate.template.selectablesSources

            if (containsOnlyStaticUrls(sourceUrlBuilders)) {
                updateSelectables(sourceUrlBuilders, {}, setSelectables)
            } else {
                let valueRefPerAbsoluteKey: Record<string, string> = createValueRefPerAbsoluteKey(
                    sourceUrlBuilders,
                    parentAbsoluteKey
                )
                let absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey)

                let subscriptions: Subscription[] = absoluteKeys
                    .map(absoluteKey => elementUpdatedObservablePerAbsoluteKey[absoluteKey].subscribe(
                        () => {
                            let valuePerValueRef: Record<string, any> = {}
                            absoluteKeys.forEach(absoluteKey => {
                                let valueRef: string = valueRefPerAbsoluteKey[absoluteKey]
                                valuePerValueRef[valueRef] = getValue(absoluteKey)
                            })

                            updateSelectables(sourceUrlBuilders, valuePerValueRef, setSelectables)
                        }
                    ))
                return () => subscriptions.forEach(subscription => subscription.unsubscribe())
            }
        }
    }, [])
    return selectables
}

function createValueRefPerAbsoluteKey(sourceUrlBuilders: IUrlBuilder[], parentAbsoluteKey?: string): Record<string, string> {
    return sourceUrlBuilders.map(urlBuilder => [
            ...urlBuilder.valueRefPerRequestParamKey ? Object.keys(urlBuilder.valueRefPerRequestParamKey) : [],
            ...urlBuilder.valueRefPerPathParamKey ? Object.keys(urlBuilder.valueRefPerPathParamKey) : []
        ]
    ).reduce<Record<string, string>>(
        (valueRefPerAbsoluteKey: Record<string, string>, currentValue) => {
            currentValue.forEach(
                valueRef => valueRefPerAbsoluteKey[getAbsoluteKeyFromValueRef(valueRef, parentAbsoluteKey)] = valueRef
            )
            return valueRefPerAbsoluteKey;
        },
        {}
    )
}

function updateSelectables(
    sourceUrlBuilders: IUrlBuilder[],
    valuePerValueRef: Record<string, string>,
    setSelectables: Dispatch<SetStateAction<any>>
): void {
    let sources: Source[] = sourceUrlBuilders
        .map(urlBuilder => createSource(urlBuilder, valuePerValueRef))
        .filter((source): source is Source => !!source)

    getSelectables(sources).then((result: ISelectable[]) => {
        setSelectables(result)
    })
}

function getSelectables(sources: Source[]): Promise<ISelectable[]> {
    return Promise.all(
        sources.map(source =>
            ResourceRepository.getSelectables('/' + source.url, source.config)
                .then<ISelectable[], ISelectable[]>(
                    (response: AxiosResponse<ISelectable[]>): ISelectable[] =>
                        response.data
                            ? response.data
                                .sort((a: ISelectable, b: ISelectable) => (a.displayName < b.displayName) ? -1 : 1)
                                .map((resource: any) => ({
                                    displayName: resource.displayName,
                                    value: resource.id
                                }))
                            : [],
                    () => []
                )
        ))
        .then((selectablesForEachSourceArray: (Awaited<ISelectable>[])[]) => {
                return selectablesForEachSourceArray !== undefined
                    ? selectablesForEachSourceArray.filter(selectablesArray => selectablesArray).flat()
                    : []
            }
        ).catch((err) => {
            console.error(err);
            return [];
        })
}
