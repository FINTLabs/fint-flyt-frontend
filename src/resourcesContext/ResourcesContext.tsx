import React, { createContext, useState, FC } from "react";
import {IResourceItem, ResourceContextState} from "./types";
import ResourceRepository from "../features/integration/repository/ResourceRepository";

const contextDefaultValues: ResourceContextState = {
    administrativeUnits: [],
    accessCodes: [],
    paragraphs: [],
    statuses: [],
    archiveSections: [],
    archiveResources: [],
    classificationSystems: [],
    classes: [],
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

export const ResourcesContext = createContext<ResourceContextState>(
    contextDefaultValues
);

const ResourcesProvider: FC = ({ children }) => {
    const [administrativeUnits, setAdministrativeUnits] = useState<IResourceItem[]>(contextDefaultValues.administrativeUnits);
    const [administrativeUnit, setAdministrativeUnit] = useState<IResourceItem[]>([]);
    const [statuses, setStatuses] = useState<IResourceItem[]>(contextDefaultValues.statuses);
    const [archiveSections, setArchiveSections] = useState<IResourceItem[]>(contextDefaultValues.archiveSections);
    const [archiveSection, setArchiveSection] = useState<IResourceItem[]>(contextDefaultValues.archiveSections);
    const [archiveResources, setArchiveResources] = useState<IResourceItem[]>(contextDefaultValues.archiveResources);
    const [accessCodes, setAccessCodes] = useState<IResourceItem[]>(contextDefaultValues.accessCodes);
    const [paragraphs, setParagraph] = useState<IResourceItem[]>(contextDefaultValues.paragraphs);
    const [documentStatuses, setDocumentStatuses] = useState<IResourceItem[]>(contextDefaultValues.documentStatuses);
    const [recordStatuses, setRecordStatuses] = useState<IResourceItem[]>(contextDefaultValues.recordStatuses);
    const [variants, setVariants] = useState<IResourceItem[]>(contextDefaultValues.variants);
    const [documentTypes, setDocumentTypes] = useState<IResourceItem[]>(contextDefaultValues.documentTypes);
    const [classificationSystems, setClassificationSystems] = useState<IResourceItem[]>(contextDefaultValues.classificationSystems);
    const [classes, setClasses] = useState<IResourceItem[]>(contextDefaultValues.classes);
    const [primaryClassification, setPrimaryClassification] = useState<IResourceItem>(contextDefaultValues.primaryClassification);
    const [secondaryClassification, setSecondaryClassification] = useState<IResourceItem>(contextDefaultValues.secondaryClassification);
    const [tertiaryClassification, setTertiaryClassification] = useState<IResourceItem>(contextDefaultValues.tertiaryClassification);
    const [primaryClass, setPrimaryClass] = useState<IResourceItem[]>(contextDefaultValues.primaryClass);
    const [secondaryClass, setSecondaryClass] = useState<IResourceItem[]>(contextDefaultValues.secondaryClass);
    const [tertiaryClass, setTertiaryClass] = useState<IResourceItem[]>(contextDefaultValues.tertiaryClass);

    const getAdministrativeUnits = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getAdministrativeUnits()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setAdministrativeUnits(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getAccessCodes = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getAccessCodes()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setAccessCodes(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getParagraphs = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getParagraphs()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setParagraph(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getStatuses = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getStatuses()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setStatuses(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getArchiveSections = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getArchiveSections()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setArchiveSections(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getArchiveResources = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getArchiveResources()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setArchiveResources(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getClassificationSystems = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getClassificationSystems()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setClassificationSystems(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getPrimaryClass = () => {
        let list: IResourceItem[] = [];
        if(primaryClassification.value !== '') {
            ResourceRepository.getClasses(primaryClassification.value)
                .then(response => {
                    response.data.map((resource: any) => {
                        list.push({label: resource.displayName, value: resource.id})
                    })
                    setPrimaryClass(list)
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    const getSecondaryClass = () => {
        let list: IResourceItem[] = [];
        if(secondaryClassification.value !== '') {
            ResourceRepository.getClasses(secondaryClassification.value)
                .then(response => {
                    response.data.map((resource: any) => {
                        list.push({label: resource.displayName, value: resource.id})
                    })
                    setSecondaryClass(list)
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }

    const getTertiaryClass = () => {
        let list: IResourceItem[] = [];
        if(tertiaryClassification.value !== '') {
            ResourceRepository.getClasses(tertiaryClassification.value)
                .then(response => {
                    response.data.map((resource: any) => {
                        list.push({label: resource.displayName, value: resource.id})
                    })
                    setTertiaryClass(list)
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }

    const getDocumentTypes = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getDocumentTypes()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setDocumentTypes(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getRecordStatuses = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getRecordStatuses()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setRecordStatuses(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getDocumentStatuses = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getDocumentStatuses()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setDocumentStatuses(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getVariants = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getVariants()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setVariants(list)
            })
            .catch((err) => {
                console.error(err);
            })
    }


    const getAllResources = () => {
        getAdministrativeUnits();
        getAccessCodes();
        getParagraphs();
        getArchiveSections();
        getArchiveResources();
        getStatuses();
        getClassificationSystems();
        getPrimaryClass();
        getSecondaryClass();
        getTertiaryClass();
        getDocumentTypes();
        getRecordStatuses();
        getDocumentStatuses();
        getVariants();

    }

    return (
        <ResourcesContext.Provider
            value={{
                administrativeUnits,
                accessCodes,
                paragraphs,
                statuses,
                archiveSections,
                archiveResources,
                classificationSystems,
                classes,
                primaryClassification,
                secondaryClassification,
                tertiaryClassification,
                primaryClass,
                secondaryClass,
                tertiaryClass,
                documentTypes,
                recordStatuses: recordStatuses,
                documentStatuses,
                variants,
                getAdministrativeUnits,
                getAccessCodes,
                getParagraphs,
                getStatuses,
                getArchiveSections,
                getArchiveResources,
                getClassificationSystems,
                getDocumentTypes,
                getRecordStatuses,
                getDocumentStatuses,
                getVariants,
                getPrimaryClass,
                getSecondaryClass,
                getAllResources,
                setPrimaryClassification,
                setSecondaryClassification,
                setTertiaryClassification
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
};

export default ResourcesProvider;
