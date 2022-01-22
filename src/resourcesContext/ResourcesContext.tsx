import React, { createContext, useState, FC } from "react";
import {IResourceItem, ResourceContextState} from "./types";
import ResourceRepository from "../features/integration/repository/ResourceRepository";

const contextDefaultValues: ResourceContextState = {
    administrativeUnits: [],
    accessCodes: [],
    paragraphs: [],
    statuses: [],
    documentTypes: [],
    documentStatuses: [],
    archiveSections: [],
    classificationSystems: [],
    classificationTypes: [],
    classes: [],
    primaryClassification: [],
    secondaryClassification: [],
    tertiaryClassification: [],
    primaryClass: [],
    secondaryClass: [],
    tertiaryClass: [],
    getAdministrativeUnits: () => {},
    getAccessCodes: () => {},
    getParagraphs: () => {},
    getStatuses: () => {},
    getDocumentTypes: () => {},
    getDocumentStatuses: () => {},
    getArchiveSections: () => {},
    getClassificationSystems: () => {},
    getAll: () => {},
};

export const ResourcesContext = createContext<ResourceContextState>(
    contextDefaultValues
);

const ResourcesProvider: FC = ({ children }) => {
    const [administrativeUnits, setAdministrativeUnits] = useState<IResourceItem[]>(contextDefaultValues.administrativeUnits);
    const [statuses, setStatuses] = useState<IResourceItem[]>(contextDefaultValues.statuses);
    const [archiveSections, setArchiveSections] = useState<IResourceItem[]>(contextDefaultValues.archiveSections);
    const [accessCodes, setAccessCodes] = useState<IResourceItem[]>(contextDefaultValues.accessCodes);
    const [paragraphs, setParagraph] = useState<IResourceItem[]>(contextDefaultValues.paragraphs);
    const [documentStatuses, setDocumentStatuses] = useState<IResourceItem[]>(contextDefaultValues.documentStatuses);
    const [documentTypes, setDocumentTypes] = useState<IResourceItem[]>(contextDefaultValues.documentTypes);
    const [classificationSystems, setClassificationSystems] = useState<IResourceItem[]>(contextDefaultValues.classificationSystems);
    const [classificationTypes, setClassificationTypes] = useState<IResourceItem[]>(contextDefaultValues.classificationTypes);
    const [classes, setClasses] = useState<IResourceItem[]>(contextDefaultValues.classes);
    const [primaryClassification, setPrimaryClassification] = useState<IResourceItem[]>(contextDefaultValues.primaryClassification);
    const [secondaryClassification, setSecondaryClassification] = useState<IResourceItem[]>(contextDefaultValues.secondaryClassification);
    const [tertiaryClassification, setTertiaryClassification] = useState<IResourceItem[]>(contextDefaultValues.tertiaryClassification);
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
                setAdministrativeUnits(administrativeUnits.concat(list))
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
                setAccessCodes(accessCodes.concat(list))
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
                setParagraph(paragraphs.concat(list))
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
                setStatuses(statuses.concat(list))
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getDocumentTypes = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getDocumentTypes()
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setDocumentTypes(documentTypes.concat(list))
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
                setDocumentStatuses(documentStatuses.concat(list))
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
                setArchiveSections(archiveSections.concat(list))
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
                setClassificationSystems(classificationSystems.concat(list))
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getPrimaryClass = () => {
        let list: IResourceItem[] = [];
        ResourceRepository.getClasses("primary")
            .then(response => {
                response.data.map((resource: any) => {
                    list.push({label: resource.displayName, value: resource.id})
                })
                setPrimaryClass(primaryClass.concat(list))
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getAll = () => {
        getAdministrativeUnits();
        getAccessCodes();
        getParagraphs();
        getStatuses();
        getDocumentTypes();
        getDocumentStatuses();
        getArchiveSections();
        getClassificationSystems();
        getPrimaryClass();
    }

    return (
        <ResourcesContext.Provider
            value={{
                administrativeUnits,
                accessCodes,
                paragraphs,
                statuses,
                documentTypes,
                documentStatuses,
                archiveSections,
                classificationSystems,
                classificationTypes,
                classes,
                primaryClassification,
                secondaryClassification,
                tertiaryClassification,
                primaryClass,
                secondaryClass,
                tertiaryClass,
                getAdministrativeUnits,
                getAccessCodes,
                getParagraphs,
                getStatuses,
                getDocumentTypes,
                getDocumentStatuses,
                getArchiveSections,
                getClassificationSystems,
                getAll
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
};

export default ResourcesProvider;
