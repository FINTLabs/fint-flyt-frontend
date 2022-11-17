export interface IResourceItem {
    label: string;
    value: string;
}

export type ResourceContextState = {
    administrativeUnits: IResourceItem[];
    accessCodes: IResourceItem[];
    caseTypes: IResourceItem[];
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
    recordTypes: IResourceItem[];

    documentStatuses: IResourceItem[];
    variants: IResourceItem[];

    getAllResources: () => void;
    resetAllResources: () => void;

    setPrimaryClassification: (primary: IResourceItem) => void;
    setSecondaryClassification: (secondary: IResourceItem) => void;
    setTertiaryClassification: (tertiary: IResourceItem) => void;
    getPrimaryClass: () => void;
    getSecondaryClass: () => void;
    getTertiaryClass: () => void;
    setPrimaryClass: (primary: IResourceItem[]) => void;
    setSecondaryClass: (primary: IResourceItem[]) => void;
    setTertiaryClass: (primary: IResourceItem[]) => void;
};

export const contextDefaultValues: ResourceContextState = {
    administrativeUnits: [],
    accessCodes: [],
    caseTypes: [],
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
    recordTypes: [],
    documentStatuses: [],
    variants: [],
    getAllResources: () => {},
    resetAllResources: () => {},
    setPrimaryClassification: (primary: IResourceItem) => {},
    setSecondaryClassification: (secondary: IResourceItem) => {},
    setTertiaryClassification: (tertiary: IResourceItem) => {},
    getPrimaryClass: () => {},
    getSecondaryClass: () => {},
    getTertiaryClass: () => {},
    setPrimaryClass: (primary: IResourceItem[]) => {},
    setSecondaryClass: (primary: IResourceItem[]) => {},
    setTertiaryClass: (primary: IResourceItem[]) => {}
};
