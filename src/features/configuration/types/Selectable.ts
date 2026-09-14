export type ApiSelectableResource = {
    displayName: string;
    id: string;
    name?: string;
    functionalId?: string;
    technicalId?: string;
};

export interface ISelectable {
    displayName: string;
    value: string
}

