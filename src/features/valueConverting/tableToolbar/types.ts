// Legg til de utkommenterte feltene når backend støtter det:
export const sortOptions = [
    "id",
    // "displayName",
    "fromTypeId",
    "toTypeId",
    "sourceApplicationIds",
    "fromApplicationId",
    "toApplicationId",
    "createdAt",
    "modifiedAt",
    // "createdBy",
    // "modifiedBy",
];

export type ValueConvertingFilters = {
    sourceApplicationIds: string[];
    createdFrom: Date | null;
    createdTo: Date | null;
    modifiedFrom: Date | null;
    modifiedTo: Date | null;
    sort: string | null;
};