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
    type: Type;
    displayName: string;
    disabled?: boolean;
    children: IInstanceElementMetadata[];
}

export enum Type {
    STRING,
    DATE,
    DATETIME,
    URL,
    EMAIL,
    PHONE,
    BOOLEAN,
    INTEGER,
    DOUBLE
}