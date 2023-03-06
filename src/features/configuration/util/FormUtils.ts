import {IElementConfig, IUrlBuilder} from "../types/NewForm/FormTemplate";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {ISelectable} from "../components/FormPanel";
import {AxiosRequestConfig} from "axios";

export function containsOnlyStaticUrls(selectableSources: IUrlBuilder[]): boolean {
    return selectableSources.every(isStaticUrl)
}

export function isStaticUrl(builder: IUrlBuilder): boolean {
    return (builder.valueKeyPerPathParamKey ? Object.keys(builder.valueKeyPerPathParamKey).length === 0 : true)
        && (builder.valueKeyPerRequestParamKey ? Object.keys(builder.valueKeyPerRequestParamKey).length === 0 : true)
}

export function getAbsoluteKey(parentRef: string, elementConfig: IElementConfig) {
    return (parentRef ? parentRef + '.' : '') + elementConfig.key
}

export function getAbsoluteKeyFromReference(valueRef: string, parentRef?: string) {
    if (valueRef.startsWith('/') || !parentRef) {
        return valueRef;
    }

    let valueRefSplit = valueRef.split('../')
    if (valueRefSplit.length === 1) {
        return parentRef + '.' + valueRefSplit;
    }

    let parentRefSplit = parentRef.split('.')
    let valueRefRemovedDynamicRefs = valueRefSplit[valueRefSplit.length-1];
    let parentRefAdjustedForDynamicRefs = parentRefSplit
        .slice(0, parentRefSplit.length-valueRefSplit.length)
        .join('.')
    return parentRefAdjustedForDynamicRefs + '.' + valueRefRemovedDynamicRefs
}

export function createSource(urlBuilder: IUrlBuilder, getValues: Function, parentRef?: string): {url: string, config?: AxiosRequestConfig} {
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

export function updateSelectables(sources: {url: string, config?: AxiosRequestConfig}[]) {
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
        )).then(result => { return result !== undefined ? result.flat() : [] }
    ).catch((err) => {
        console.error(err);
        return [];
    })
}