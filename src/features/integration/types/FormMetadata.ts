export interface IFormMetadata {
    id: string;
    displayName: string;
    instanceElementMetadata: IInstanceElementMetadata[];
}

export interface IInstanceElementMetadata {
    id: string;
    displayName: string;
    children: ITagGroup[];
}

export interface ITagGroup {
    id: string;
    displayName: string;
    children: ITagGroup[]
}
