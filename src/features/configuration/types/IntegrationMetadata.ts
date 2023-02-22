export interface IIntegrationMetadata {
    id?: any;
    sourceApplicationId: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationIntegrationUri: string;
    integrationDisplayName: string;
    version: number;
    instanceElementMetadata: IInstanceElementMetadata[];
}
export interface IInstanceElementMetadata {
    id?: string;
    key: string | null;
    type: string;
    displayName: string;
    disabled?: boolean;
    children: IInstanceElementMetadata[];
}

export const Type = {
    STRING: "STRING",
    DATE: "DATE",
    DATETIME: "DATETIME",
    URL: "URL",
    EMAIL: "EMAIL",
    PHONE: "PHONE",
    BOOLEAN: "BOOLEAN",
    INTEGER: "INTEGER",
    DOUBLE: "DOUBLE",
    FILE: "FILE",
    UNKNOWN: "UNKNOWN"
}