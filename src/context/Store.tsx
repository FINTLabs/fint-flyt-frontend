import * as React from 'react';
import {createContext, useContext, useState} from 'react';
import ResourceRepository from "../features/integration/repository/ResourceRepository";

interface ResourceItem {
    label: string;
    value: string;}

interface Resources {
    administrativeUnits?: ResourceItem[],
    accessCodes?: ResourceItem[],
    paragraphs?: ResourceItem[]
}
//
// const initialResources: ResourceItem[] = [
//     { label: 'alt1', value: 'My first resource' },
//     { label: 'alt2', value: 'My second resource' }
// ];
//

let initialResourcesList: Resources = {}

//
// function mapResponse(data: any, name: string): void {
//     let list: ResourceItem[] = [];
//     data.map((resource: any) => {
//         list.push({label: resource.displayName, value: resource.id})
//     })
//     initialResourcesList.push({id: name, resources: list})
// }

let administrativeUnits: ResourceItem[] = [];
let archiveSections: ResourceItem[] = [];
let accessCodes: ResourceItem[] = [];
let paragraphs: ResourceItem[] = [];

const getAllResources = async () => {
    try {
        await ResourceRepository.getAdministrativeUnits()
            .then(response => {
                response.data.map((resource: any) => {
                    administrativeUnits.push({label: resource.displayName, value: resource.id})
                })
                initialResourcesList.administrativeUnits = administrativeUnits;
                return administrativeUnits
            })
            .catch((err) => {
                console.error(err);
            })
        await ResourceRepository.getAccessCodes()
            .then(response => {
                response.data.map((resource: any) => {
                    accessCodes.push({label: resource.displayName, value: resource.id})
                })
                initialResourcesList.accessCodes = accessCodes
                return accessCodes
            })
            .catch((err) => {
                console.error(err);
            })
        await ResourceRepository.getParagraphs()
            .then(response => {
                response.data.map((resource: any) => {
                    paragraphs.push({label: resource.displayName, value: resource.id})
                })
                initialResourcesList.paragraphs = paragraphs;
                return paragraphs
            })
            .catch((err) => {
                console.error(err);
            })
    }
    catch (err) {
        console.error(err);
    }


    // ResourceRepository.getClassificationSystems()
    //     .then(response => {
    //         mapResponse(response.data, 'classificationSystems');
    //     })
    //
    // ResourceRepository.getStatuses()
    //     .then(response => {
    //         mapResponse(response.data, 'statuses')
    //     })
    // ResourceRepository.getArchiveSections()
    //     .then(response => {
    //         console.log(response)
    //     })
    // ResourceRepository.getAccessCodes()
    //     .then(response => {
    //         console.log(response)
    //     })
    // ResourceRepository.getParagraphs()
    //     .then(response => {
    //         console.log(response)
    //     })
    // ResourceRepository.getClassificationTypes()
    //     .then(response => {
    //         console.log(response)
    //     })
    // ResourceRepository.getDocumentStatuses()
    //     .then(response => {
    //         console.log(response)
    //     })
    // ResourceRepository.getDocumentTypes()
    //     .then(response => {
    //         console.log(response)
    //     })
}

const resources = getAllResources();

const useResources = () => useState(initialResourcesList);
const ResourcesContext = createContext<ReturnType<typeof useResources> | null>(null);


export const useResourceContext = () => {
    const value = useContext(ResourcesContext);
    if (value === null) throw new Error('Please add ResourcesContextProvider');
    return value;
};

export const ResourceContextProvider: React.FC = ({ children }) => (
    <ResourcesContext.Provider value={useResources()}>{children}</ResourcesContext.Provider>
);
