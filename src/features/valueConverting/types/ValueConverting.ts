export interface IValueConverting {
    id: number,
    displayName: string,
    fromApplicationId: string,
    fromTypeId: string,
    toApplicationId: string,
    toTypeId: string,
    convertingMap: Record<string, string>
}