// Legg til de utkommenterte feltene når backend støtter det:
export const sortOptions = [
    "id",
    "displayName",
    "fromTypeId",
    "toTypeId",
    // "sourceApplicationIds",
    "fromApplicationId",
    "toApplicationId",
    "createdAt",
    "modifiedAt",
    // "createdBy",
    // "modifiedBy",
];

export type SortState = {
    orderBy: string | undefined;
    direction: 'ASC' | 'DESC' | undefined;
};

export type ValueConvertingFilters = {
    displayName: string | null;
    sourceApplicationIds: string[];
    toApplicationId: string | null;
    toTypeId: string | null;
    fromTypeId: string | null;
    createdFrom: Date | null;
    createdTo: Date | null;
    modifiedFrom: Date | null;
    modifiedTo: Date | null;
    sort: SortState;
};