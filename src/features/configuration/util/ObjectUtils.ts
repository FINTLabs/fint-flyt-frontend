export function recordOrEmpty<V>(optionalRecord?: Record<string, V>): Record<string, V> {
    return optionalRecord
        ? optionalRecord
        : {};
}