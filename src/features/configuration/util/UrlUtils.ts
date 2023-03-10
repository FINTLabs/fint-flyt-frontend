import {IUrlBuilder} from "../types/NewForm/FormTemplate";
import {AxiosRequestConfig} from "axios";
import {recordOrEmpty} from "./ObjectUtils";

export type Source = { url: string, config?: AxiosRequestConfig }

const pathParamKeyRegExp: RegExp = new RegExp(/{[^{}]+}/g);

export function createSource(urlBuilder: IUrlBuilder, valuePerValueRef: Record<string, any>): Source | undefined {
    let params: Record<string, string> = {};
    let url: string = urlBuilder.urlTemplate;
    let valueRefPerRequestParamKey = recordOrEmpty(urlBuilder.valueRefPerRequestParamKey);
    let valueRefPerPathParamKey = recordOrEmpty(urlBuilder.valueRefPerPathParamKey);
    let dependsOnUndefinedValue: boolean = [
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
                let pathParamKey: string = substring.slice(1, substring.length - 1)
                return valuePerValueRef[valueRefPerPathParamKey[pathParamKey]]
            })
        )
    }
    return {url: url, config: {params: params}};
}
