export interface IFormMetadata {
    metadata: {
        name: string;
        sourceApplicationIntegrationId: string
    }
    steps: IStep[];
}

export interface IStep {
    name: string;
    groups: IGroup[];
}

export interface IGroup {
    name: string;
    elements: IElements[];
}

export interface IElements {
    name: string;
    type: string;
}
