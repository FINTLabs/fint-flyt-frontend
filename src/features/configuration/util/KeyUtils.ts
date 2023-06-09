export function getAbsoluteKeyFromValueRef(valueRef: string, absoluteKey: string) {
    valueRef = "valueMappingPerKey." + valueRef + ".mappingString";
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

export function findFromCollectionMappingAbsoluteKeys(absoluteKey: string): string[] {
    const fromCollectionAbsoluteKeyPattern = new RegExp(
        /(^.*?\.(?:object|value)CollectionMappingPerKey\.[^.]+\.fromCollectionMappings\.\d+)(\.|$)/g
    );
    const match: RegExpExecArray | null = fromCollectionAbsoluteKeyPattern.exec(absoluteKey)
    if (match) {
        const absoluteKeyToLastIndexOfMatch: string = absoluteKey.slice(0, match.index + match[0].length);
        const absoluteKeyFromLastIndexOfMatch: string = absoluteKey.slice(match.index + match[0].length);
        return [
            match[0],
            ...findFromCollectionMappingAbsoluteKeys(absoluteKeyFromLastIndexOfMatch)
                .map((matchedFromCollectionMappingAbsoluteKey: string) =>
                    absoluteKeyToLastIndexOfMatch + matchedFromCollectionMappingAbsoluteKey
                )
        ]
    } else {
        return [];
    }
}

export function isOutsideCollectionEditContext(absoluteKey: string, editContextAbsoluteKey: string): boolean {
    return !absoluteKey.startsWith(editContextAbsoluteKey)
        || absoluteKey.slice(editContextAbsoluteKey.length).includes(".fromCollectionMappings.");
}
