import {IUrlBuilder} from "../types/NewForm/FormTemplate";
import {AxiosResponse} from "axios";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {ISelectable} from "../components/FormPanel";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Control} from "react-hook-form/dist/types/form";
import {useWatch} from "react-hook-form";
import {createSource, Source} from "./UrlUtils";
import {getAbsoluteKeyFromValueRef} from "./KeyUtils";

export function CreateSelectables(
    control: Control,
    staticSelectables: ISelectable[] = [],
    sourceUrlBuilders: IUrlBuilder[] = [],
    parentAbsoluteKey?: string
): ISelectable[] {
    const [selectables, setSelectables] = useState<ISelectable[]>(staticSelectables)
    const valueRefPerAbsoluteKey: Record<string, string> = createValueRefPerAbsoluteKey(
        sourceUrlBuilders,
        parentAbsoluteKey
    )
    const absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey)
    const useWatchValues: any[] = useWatch({control, name: absoluteKeys})

    useEffect(() => {
        let valuePerValueRef: Record<string, any> = {};
        Array.from(Array(absoluteKeys.length).keys())
            .forEach(i =>
                valuePerValueRef[valueRefPerAbsoluteKey[absoluteKeys[i]]] = useWatchValues[i]
            )
        updateSelectables(staticSelectables, sourceUrlBuilders, valuePerValueRef, setSelectables)
    }, [useWatchValues])
    return selectables
}

function createValueRefPerAbsoluteKey(sourceUrlBuilders: IUrlBuilder[], parentAbsoluteKey?: string): Record<string, string> {
    return sourceUrlBuilders.map(urlBuilder => [
            ...urlBuilder.valueRefPerRequestParamKey ? Object.values(urlBuilder.valueRefPerRequestParamKey) : [],
            ...urlBuilder.valueRefPerPathParamKey ? Object.values(urlBuilder.valueRefPerPathParamKey) : []
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
    staticSelectables: ISelectable[],
    sourceUrlBuilders: IUrlBuilder[],
    valuePerValueRef: Record<string, string>,
    setSelectables: Dispatch<SetStateAction<any>>
): void {
    let sources: Source[] = sourceUrlBuilders
        .map(urlBuilder => createSource(urlBuilder, valuePerValueRef))
        .filter((source): source is Source => !!source)

    getSelectables(sources).then((result: ISelectable[]) => {
        setSelectables([...staticSelectables, ...result])
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
