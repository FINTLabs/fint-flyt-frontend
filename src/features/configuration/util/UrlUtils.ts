import {IUrlBuilder} from "../types/NewForm/FormTemplate";
import {AxiosRequestConfig} from "axios";

export function containsOnlyStaticUrls(selectableSources: IUrlBuilder[]): boolean {
    return selectableSources.every(isStaticUrl)
}

function isStaticUrl(builder: IUrlBuilder): boolean {
    return (builder.valueRefPerPathParamKey ? Object.keys(builder.valueRefPerPathParamKey).length === 0 : true)
        && (builder.valueRefPerRequestParamKey ? Object.keys(builder.valueRefPerRequestParamKey).length === 0 : true)
}

export type Source = { url: string, config?: AxiosRequestConfig }

const pathParamKeyRegExp: RegExp = new RegExp(/{[^{}]+}/g);

export function createSource(urlBuilder: IUrlBuilder, valuePerValueRef: Record<string, any>): Source | undefined {
    let params: Record<string, string> = {};
    let url: string = urlBuilder.urlTemplate;

    let dependsOnUndefinedValue: boolean = [
        ...urlBuilder.valueRefPerRequestParamKey ? Object.keys(urlBuilder.valueRefPerRequestParamKey) : [],
        ...urlBuilder.valueRefPerPathParamKey ? Object.keys(urlBuilder.valueRefPerPathParamKey) : []
    ]
        .map(valueRef => valuePerValueRef[valueRef])
        .find(value => value === undefined || value === "") !== undefined
    if (dependsOnUndefinedValue) {
        return undefined;
    }

    if (urlBuilder.valueRefPerRequestParamKey) {
        Object.entries(urlBuilder.valueRefPerRequestParamKey)
            .forEach(([requestParamKey, valueRef]) => {
                params[requestParamKey] = valuePerValueRef[valueRef];
            })
    }
    if (urlBuilder.valueRefPerPathParamKey) {
        url.replaceAll(
            pathParamKeyRegExp,
            ((substring: string) => {
                let pathParamKey: string = substring.slice(1, substring.length - 1)
                return valuePerValueRef[pathParamKey]
            })
        )
    }
    return {url: url, config: {params: params}};
}
