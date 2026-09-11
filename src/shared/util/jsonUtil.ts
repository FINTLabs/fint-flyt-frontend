export function toInstanceFieldReference(key: string): string {
    return '$if{' + key + '}';
}

export function toInstanceCollectionFieldReference(collectionIndex: number, key: string): string {
    return '$icf{' + collectionIndex + '}{' + key + '}';
}

