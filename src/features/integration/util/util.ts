export interface property {
    order: number;
    key: string;
    source: string;
}

export interface propertyString {
    value: string;
    properties?: property[]
}

export enum VALUE_BUILDER_STRATEGY {
    FIXED_ARCHIVE_CODE_VALUE,
    COMBINE_STRING_VALUE
}

