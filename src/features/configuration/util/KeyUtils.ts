import {IElementConfig} from "../types/NewForm/FormTemplate";

export function getAbsoluteKey(parentAbsoluteKey: string, elementConfig: IElementConfig) {
    return (parentAbsoluteKey ? parentAbsoluteKey + '.' : '') + elementConfig.key
}

export function getAbsoluteKeyFromValueRef(valueRef: string, parentAbsoluteKey?: string) {
    if (valueRef.startsWith('/') || !parentAbsoluteKey) {
        return valueRef;
    }

    let valueRefSplit = valueRef.split('../')
    if (valueRefSplit.length === 1) {
        return parentAbsoluteKey + '.' + valueRefSplit;
    }

    let parentAbsoluteKeySplit = parentAbsoluteKey.split('.')
    let valueRefRemovedDynamicRefs = valueRefSplit[valueRefSplit.length - 1];
    let parentAbsoluteKeyAdjustedForDynamicRefs = parentAbsoluteKeySplit
        .slice(0, parentAbsoluteKeySplit.length - valueRefSplit.length)
        .join('.')
    return parentAbsoluteKeyAdjustedForDynamicRefs + '.' + valueRefRemovedDynamicRefs
}
