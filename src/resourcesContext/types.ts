export interface IResourceItem {
    label: string;
    value: string;
}

export type ResourceContextState = {
    administrativeUnits: IResourceItem[];
    accessCodes: IResourceItem[];
    paragraphs: IResourceItem[];

    statuses: IResourceItem[];
    archiveSections: IResourceItem[];
    archiveResources: IResourceItem[];
    classificationSystems: IResourceItem[];
    primaryClassification: IResourceItem;
    secondaryClassification: IResourceItem;
    tertiaryClassification: IResourceItem;
    primaryClass: IResourceItem[];
    secondaryClass: IResourceItem[];
    tertiaryClass: IResourceItem[];

    documentTypes: IResourceItem[];
    recordStatuses: IResourceItem[];

    documentStatuses: IResourceItem[];
    variants: IResourceItem[];

    getAllResources: () => void;
    resetAllResources: () => void;

    getAdministrativeUnits: () => void;
    getAccessCodes: () => void;
    getParagraphs: () => void;

    getStatuses: () => void;
    getArchiveSections: () => void;
    getArchiveResources: () => void;
    getClassificationSystems: () => void;
    setPrimaryClassification: (primary: IResourceItem) => void;
    setSecondaryClassification: (secondary: IResourceItem) => void;
    setTertiaryClassification: (tertiary: IResourceItem) => void;
    getPrimaryClass: () => void;
    getSecondaryClass: () => void;

    getDocumentTypes: () => void;
    getRecordStatuses: () => void;

    getDocumentStatuses: () => void;
    getVariants: () => void;

};

export const contextDefaultValues: ResourceContextState = {
    administrativeUnits: [],
    accessCodes: [],
    paragraphs: [],
    statuses: [],
    archiveSections: [],
    archiveResources: [],
    classificationSystems: [],
    primaryClassification: {label: '', value: ''},
    secondaryClassification: {label: '', value: ''},
    tertiaryClassification: {label: '', value: ''},
    primaryClass: [{label: 'velg primær ordningsprinsipp først', value: ''}],
    secondaryClass: [{label: 'velg sekundær ordningsprinsipp først', value: ''}],
    tertiaryClass: [{label: 'velg tertiær ordningsprinsipp først', value: ''}],
    documentTypes: [],
    recordStatuses: [],
    documentStatuses: [],
    variants: [],
    getAllResources: () => {},
    resetAllResources: () => {},
    getAdministrativeUnits: () => {},
    getAccessCodes: () => {},
    getParagraphs: () => {},
    getStatuses: () => {},
    getArchiveSections: () => {},
    getArchiveResources: () => {},
    getClassificationSystems: () => {},
    setPrimaryClassification: (primary: IResourceItem) => {},
    setSecondaryClassification: (secondary: IResourceItem) => {},
    setTertiaryClassification: (tertiary: IResourceItem) => {},
    getPrimaryClass: () => {},
    getSecondaryClass: () => {},
    getDocumentTypes: () => {},
    getRecordStatuses: () => {},
    getDocumentStatuses: () => {},
    getVariants: () => {}
};