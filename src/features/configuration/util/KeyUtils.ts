export function getAbsoluteKeyFromValueRef(valueRef: string, absoluteKey: string) {
    if (valueRef.startsWith('/')) {
        return valueRef;
    }

    const valueRefSplit = valueRef.split('../')
    const numOfLevelsUpInValueRef = valueRefSplit.length - 1;
    if (numOfLevelsUpInValueRef === 0) {
        return absoluteKey + '.' + valueRefSplit;
    }
    const valueRefRemovedDynamicRefs = valueRefSplit[numOfLevelsUpInValueRef];

    const absoluteKeySplit = absoluteKey.split('.')
    const numOfLevelsInAbsoluteKey = absoluteKeySplit.length;

    const parentAbsoluteKeyAdjustedForDynamicRefs = absoluteKeySplit
        .slice(0, numOfLevelsInAbsoluteKey - numOfLevelsUpInValueRef)
        .join('.')
    return parentAbsoluteKeyAdjustedForDynamicRefs + '.' + valueRefRemovedDynamicRefs
}
