export interface ICaseSearchParams {
    searchStrategy: string;
    primaryClassification?: string;
    primaryClass?: string;
    primaryTitle?: string;
    archiveSection?: string;
    type?: string;
    accessCode?: string;
}

export const SEARCH_STRATEGY = {
    CLASS: 'CLASS',
    CLASS_ARCHIVESECTION: 'CLASS_ARCHIVESECTION',
    CLASS_TYPE: 'CLASS_TYPE',
    CLASS_ARCHIVESECTION_TYPE: 'CLASS_ARCHIVESECTION_TYPE',
    CLASS_ACCESSCODE_ARCHIVESECTION_TYPE: 'CLASS_ACCESSCODE_ARCHIVESECTION_TYPE'
}

