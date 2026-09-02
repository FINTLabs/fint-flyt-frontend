export interface IValueConverting {
    id: number,
    displayName: string,
    fromApplicationId: number,
    fromTypeId: string,
    toApplicationId: string,
    toTypeId: string,
    convertingMap: Record<string, string>
    createdAt: string | null
    lastModifiedAt: string | null
    lastModifiedBy: string | null
    createdBy: string | null
}