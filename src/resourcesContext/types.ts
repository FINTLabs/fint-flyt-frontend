export interface IResourceItem {
    label: string;
    value: string;
}

export interface IResources {
    administrativeUnits?: IResourceItem[],
    accessCodes?: IResourceItem[],
    paragraphs?: IResourceItem[],
    classes?: IResourceItem[],
    classificationTypes?: IResourceItem[]
}

export type ResourceContextState = {
    administrativeUnits: IResourceItem[];
    accessCodes: IResourceItem[];
    paragraphs: IResourceItem[];
    statuses: IResourceItem[];
    documentTypes: IResourceItem[];
    documentStatuses: IResourceItem[];
    archiveSections: IResourceItem[];
    classificationSystems: IResourceItem[];
    classificationTypes: IResourceItem[];
    classes: IResourceItem[];
    primaryClassification: IResourceItem[];
    secondaryClassification: IResourceItem[];
    tertiaryClassification: IResourceItem[];
    primaryClass: IResourceItem[];
    secondaryClass: IResourceItem[];
    tertiaryClass: IResourceItem[];
    getAdministrativeUnits: () => void;
    getAccessCodes: () => void;
    getParagraphs: () => void;
    getStatuses: () => void;
    getDocumentTypes: () => void;
    getDocumentStatuses: () => void;
    getArchiveSections: () => void;
    getClassificationSystems: () => void;
    getAll: () => void;
};
