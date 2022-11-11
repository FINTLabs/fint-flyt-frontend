import React, { createContext, useState, FC } from "react";
import ResourceRepository from "../../shared/repositories/ResourceRepository";
import {contextDefaultValues, IResourceItem, ResourceContextState} from "./types";
import {
    applicantOptions,
    creationStrategies,
    dropdownPlaceholder
} from "../../features/integration/defaults/DefaultValues";

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
    const [accessCode, setAccessCode] = useState<IResourceItem[]>(contextDefaultValues.accessCodes);
    const [caseTypes, setCaseTypes] = useState<IResourceItem[]>(contextDefaultValues.caseTypes);
    const [paragraphs, setParagraph] = useState<IResourceItem[]>(contextDefaultValues.paragraphs);
    const [documentStatuses, setDocumentStatuses] = useState<IResourceItem[]>(contextDefaultValues.documentStatuses);
    const [recordStatuses, setRecordStatuses] = useState<IResourceItem[]>(contextDefaultValues.recordStatuses);
    const [recordTypes, setRecordTypes] = useState<IResourceItem[]>(contextDefaultValues.recordTypes);
    const [variants, setVariants] = useState<IResourceItem[]>(contextDefaultValues.variants);
    const [documentTypes, setDocumentTypes] = useState<IResourceItem[]>(contextDefaultValues.documentTypes);
    const [classificationSystems, setClassificationSystems] = useState<IResourceItem[]>(contextDefaultValues.classificationSystems);
    const [primaryClassification, setPrimaryClassification] = useState<IResourceItem>(contextDefaultValues.primaryClassification);
    const [secondaryClassification, setSecondaryClassification] = useState<IResourceItem>(contextDefaultValues.secondaryClassification);
    const [tertiaryClassification, setTertiaryClassification] = useState<IResourceItem>(contextDefaultValues.tertiaryClassification);
    const [primaryClass, setPrimaryClass] = useState<IResourceItem[]>(contextDefaultValues.primaryClass);
    const [secondaryClass, setSecondaryClass] = useState<IResourceItem[]>(contextDefaultValues.secondaryClass);
    const [tertiaryClass, setTertiaryClass] = useState<IResourceItem[]>(contextDefaultValues.tertiaryClass);

    const resourceList: any[] = [
        {resource: 'administrativenhet', setter: setAdministrativeUnits},
        {resource: 'sakstatus', setter: setStatuses},
        {resource: 'arkivdel', setter: setArchiveSections},
        {resource: 'arkivressurs', setter: setArchiveResources},
        {resource: 'saksmappetype', setter: setCaseTypes},
        {resource: 'klassifikasjonssystem', setter: setClassificationSystems},
        {resource: 'tilgangsrestriksjon', setter: setAccessCodes},
        {resource: 'skjermingshjemmel', setter: setParagraph},
        {resource: 'journalstatus', setter: setRecordStatuses},
        {resource: 'journalposttype', setter: setRecordTypes},
        {resource: 'variantformat', setter: setVariants},
        {resource: 'dokumentstatus', setter: setDocumentStatuses},
        {resource: 'dokumenttype', setter: setDocumentTypes},
    ]

    const getResource = (resource: string, resourceSetter: any) => {
        let list: IResourceItem[] = [];
        ResourceRepository.getResource(resource)
            .then(response => {
                let data = response.data;
                if (data) {
                    data.sort((a: any, b: any) => {
                        if (a.displayName < b.displayName) {
                            return -1;
                        }
                    });
                    data.map((resource: any) => list.push({label: resource.displayName, value: resource.id}))
                    resourceSetter(list)
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getPrimaryClass = async () => {
        let list: IResourceItem[] = [];
        if(primaryClassification.value !== '') {
            ResourceRepository.getClasses(primaryClassification.value)
                .then(response => {
                    let data = response.data;
                    if (data) {
                        data.map((resource: any) => list.push({label: resource.id + ' - ' + resource.displayName, value: resource.id}))
                        setPrimaryClass(list)
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }

    const getSecondaryClass = async () => {
        let list: IResourceItem[] = [];
        if(secondaryClassification.value !== '') {
            ResourceRepository.getClasses(secondaryClassification.value)
                .then(response => {
                    let data = response.data;
                    if (data) {
                        data.map((resource: any) => list.push({
                            label: resource.id + ' - ' + resource.displayName,
                            value: resource.id
                        }))
                        setSecondaryClass(list)
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }

    const getTertiaryClass = async () => {
        let list: IResourceItem[] = [];
        if(tertiaryClassification.value !== '') {
            ResourceRepository.getClasses(tertiaryClassification.value)
                .then(response => {
                    let data = response.data;
                    if (data) {
                        data.map((resource: any) => list.push({
                            label: resource.id + ' - ' + resource.displayName,
                            value: resource.id
                        }))
                        setTertiaryClass(list)
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }

    const getAllResources = () => {
        resourceList.map((r) => {
            getResource(r.resource, r.setter)
        })
    }

    const resetAllResources = () => {
        setPrimaryClassification(contextDefaultValues.primaryClassification)
        setSecondaryClassification(contextDefaultValues.secondaryClassification)
        setTertiaryClassification(contextDefaultValues.tertiaryClassification)
        setPrimaryClass(contextDefaultValues.primaryClass)
        setSecondaryClass(contextDefaultValues.secondaryClass)
        setTertiaryClass(contextDefaultValues.tertiaryClass)
    }

    function getResourcesByName(name: string): IResourceItem[] {
        if(name === 'administrativeUnits') return administrativeUnits;
        if(name === 'accessCodes') return accessCodes;
        if(name === 'caseTypes') return caseTypes;
        if(name === 'paragraphs') return paragraphs;
        if(name === 'statuses') return statuses;
        if(name === 'archiveSections') return archiveSections;
        if(name === 'archiveResources') return archiveResources;
        if(name === 'classificationSystems') return classificationSystems;
        if(name === 'documentTypes') return documentTypes;
        if(name === 'recordStatuses') return recordStatuses;
        if(name === 'recordTypes') return recordTypes;
        if(name === 'documentStatuses') return documentStatuses;
        if(name === 'variants') return variants;
        if(name === 'creationStrategies') return creationStrategies;
        if(name === 'applicantOptions') return applicantOptions;
        else return dropdownPlaceholder;
    }

    return (
        <ResourcesContext.Provider
            value={{
                administrativeUnits,
                accessCodes,
                caseTypes,
                paragraphs,
                statuses,
                archiveSections,
                archiveResources,
                classificationSystems,
                primaryClassification,
                secondaryClassification,
                tertiaryClassification,
                primaryClass,
                secondaryClass,
                tertiaryClass,
                documentTypes,
                recordStatuses,
                recordTypes,
                documentStatuses,
                variants,
                getPrimaryClass,
                getSecondaryClass,
                getTertiaryClass,
                setPrimaryClass,
                setSecondaryClass,
                setTertiaryClass,
                getAllResources,
                resetAllResources,
                setPrimaryClassification,
                setSecondaryClassification,
                setTertiaryClassification,
                getResourcesByName
            }}
        >
            {children}
        </ResourcesContext.Provider>
    );
};

export default ResourcesProvider;
