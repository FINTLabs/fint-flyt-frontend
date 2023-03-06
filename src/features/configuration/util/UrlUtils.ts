import {IUrlBuilder} from "../types/NewForm/FormTemplate";
import {AxiosRequestConfig} from "axios";

export function containsOnlyStaticUrls(selectableSources: IUrlBuilder[]): boolean {
    return selectableSources.every(isStaticUrl)
}

function isStaticUrl(builder: IUrlBuilder): boolean {
    return (builder.valueRefPerPathParamKey ? Object.keys(builder.valueRefPerPathParamKey).length === 0 : true)
        && (builder.valueRefPerRequestParamKey ? Object.keys(builder.valueRefPerRequestParamKey).length === 0 : true)
}

export function createSource(urlBuilder: IUrlBuilder, valuesPerValueRef: Record<string, any>): { url: string, config?: AxiosRequestConfig } {
    let params: Record<string, string> = {};
    let url: string = urlBuilder.urlTemplate;
    if (urlBuilder.valueRefPerRequestParamKey) {
        Object.entries(urlBuilder.valueRefPerRequestParamKey)
            .forEach(([requestParamKey, valueRef]) =>
                params[requestParamKey] = valuesPerValueRef[valueRef]);
    }
    if (urlBuilder.valueRefPerPathParamKey) {
        Object.entries(urlBuilder.valueRefPerPathParamKey)
            .forEach(([pathParamKey, valueRef]) => {
                url = url.replace('{' + pathParamKey + '}', valuesPerValueRef[valueRef])
            })
    }
    return {url: url, config: {params: params}};
}
