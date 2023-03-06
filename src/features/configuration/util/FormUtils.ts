import {IElementConfig, IUrlBuilder} from "../types/NewForm/FormTemplate";

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
    let valueRefRemovedDynamicRefs = valueRefSplit[valueRefSplit.length - 1];
    let parentRefAdjustedForDynamicRefs = parentRefSplit
        .slice(0, parentRefSplit.length - valueRefSplit.length)
        .join('.')
    return parentRefAdjustedForDynamicRefs + '.' + valueRefRemovedDynamicRefs
}
