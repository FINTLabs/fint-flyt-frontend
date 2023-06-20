import {IUrlBuilder} from "../types/FormTemplate";
import {AxiosRequestConfig} from "axios";
import {recordOrEmpty} from "./ObjectUtils";
import {getAbsoluteKeyFromValueRef} from "./KeyUtils";
import {useEffect, useState} from "react";
import {useFormContext, useWatch} from "react-hook-form";

export type Source = { url: string, config?: AxiosRequestConfig }

const pathParamKeyRegExp = new RegExp(/{[^{}]+}/g);

export type Search = {
    dependsOn: string[],
    source: Source | undefined
}

export function SourceStatefulValue(urlBuilder: IUrlBuilder, absoluteKey: string): Search {
    const {control} = useFormContext();

    const valueRefPerAbsoluteKey: Record<string, string> = createValueRefPerAbsoluteKey([urlBuilder], absoluteKey);
    const absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey)

    const [search, setSearch] = useState<Search>({
        dependsOn: absoluteKeys,
        source: undefined
    })

    const urlParamValuesWatch: string[] = useWatch({
        control: control,
        name: absoluteKeys
    })

    useEffect(() => {
        const valuePerValueRef: Record<string, any> = {};
        Array.from(Array(absoluteKeys.length).keys())
            .forEach(i =>
                valuePerValueRef[valueRefPerAbsoluteKey[absoluteKeys[i]]] = urlParamValuesWatch[i]
            )
        setSearch({
            ...{
                dependsOn: absoluteKeys,
                source: createSource(urlBuilder, valuePerValueRef)
            }
        })
    }, [urlParamValuesWatch])

    return search;
}

export function createValueRefPerAbsoluteKey(sourceUrlBuilders: IUrlBuilder[], absoluteKey: string): Record<string, string> {
    return sourceUrlBuilders.map(urlBuilder => [
            ...urlBuilder.valueRefPerRequestParamKey ? Object.values(urlBuilder.valueRefPerRequestParamKey) : [],
            ...urlBuilder.valueRefPerPathParamKey ? Object.values(urlBuilder.valueRefPerPathParamKey) : []
        ]
    ).reduce<Record<string, string>>(
        (valueRefPerAbsoluteKey: Record<string, string>, currentValue) => {
            currentValue.forEach(
                valueRef => valueRefPerAbsoluteKey[getAbsoluteKeyFromValueRef(valueRef, absoluteKey)] = valueRef
            )
            return valueRefPerAbsoluteKey;
        },
        {}
    )
}

export function createSource(urlBuilder: IUrlBuilder, valuePerValueRef: Record<string, any>): Source | undefined {
    const params: Record<string, string> = {};
    let url: string = urlBuilder.urlTemplate;
    const valueRefPerRequestParamKey = recordOrEmpty(urlBuilder.valueRefPerRequestParamKey);
    const valueRefPerPathParamKey = recordOrEmpty(urlBuilder.valueRefPerPathParamKey);
    const dependsOnUndefinedValue: boolean = [
        ...Object.values(valueRefPerRequestParamKey),
        ...Object.values(valueRefPerPathParamKey)
    ]
        .map(valueRef => valuePerValueRef[valueRef])
        .some(value => value === undefined || value === "")
    if (dependsOnUndefinedValue) {
        return undefined;
    }

    Object.entries(valueRefPerRequestParamKey)
        .forEach(([requestParamKey, valueRef]) => {
            params[requestParamKey] = valuePerValueRef[valueRef];
        })

    if (Object.keys(valueRefPerPathParamKey).length > 0) {
        url = url.replaceAll(
            pathParamKeyRegExp,
            ((substring: string) => {
                const pathParamKey: string = substring.slice(1, substring.length - 1)
                return valuePerValueRef[valueRefPerPathParamKey[pathParamKey]]
            })
        )
    }
    return {url: url, config: {params: params}};
}
