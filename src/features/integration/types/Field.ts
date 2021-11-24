export interface IField {
    field?: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: {
        value?: string;
        properties?: property[]
    }
}

export enum VALUE_BUILDER_STRATEGY {
    FIXED_ARCHIVE_CODE_VALUE,
    COMBINE_STRING_VALUE
}

export interface property {
    order: number;
    key: string;
    source: string;
}
