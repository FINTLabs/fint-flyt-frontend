const ifRegex = new RegExp(/^\$if{([^.]*)}$/);
const icfRegex = new RegExp(/^\$icf{(\d+)}{([^.]*)}$/);

export function isFieldReference(reference: string): boolean {
    return ifRegex.test(reference);
}

export function extractFieldReferenceKey(reference: string): string {
    const match = ifRegex.exec(reference);
    if (match === null) {
        throw new Error('Could not extract field reference key');
    }
    return match[1];
}

export function isCollectionFieldReference(reference: string): boolean {
    return icfRegex.test(reference);
}

export function extractCollectionFieldReferenceIndexAndKey(reference: string): [number, string] {
    const match = icfRegex.exec(reference);
    if (match === null) {
        throw new Error('Could not extract collection field reference index and key');
    }
    return [Number.parseInt(match[1]), match[2]];
}
