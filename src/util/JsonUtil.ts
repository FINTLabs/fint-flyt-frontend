export function addId(id: number, field: string) {
    return function iter(obj: any) {
        if (field in obj) {
            obj.id = id++;
        }
        Object.keys(obj).forEach(function (k) {
            Array.isArray(obj[k]) && obj[k].forEach(iter);
        });
    };
}

export function toInstanceFieldReference(key: string): string {
    return '$if{' + key + '}';
}

export function toInstanceCollectionFieldReference(collectionIndex: number, key: string): string {
    return '$icf{' + collectionIndex + '}{' + key + '}';
}

