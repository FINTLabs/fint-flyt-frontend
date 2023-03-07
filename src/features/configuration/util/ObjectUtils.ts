export function arrayOrEmpty<T>(optionalArray?: T[]) {
    return optionalArray
        ? optionalArray
        : [];
}