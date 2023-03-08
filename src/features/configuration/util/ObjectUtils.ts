export function arrayOrEmpty<T>(optionalArray?: T[]) {
    return optionalArray
        ? optionalArray
        : [];
}

export function recordOrEmpty<V>(optionalRecord?: Record<string, V>): Record<string, V> {
    return optionalRecord
        ? optionalRecord
        : {};
}