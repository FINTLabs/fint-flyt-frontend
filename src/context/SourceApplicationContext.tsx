import React, {createContext, useState} from "react";

import {
	IInstanceMetadataContent,
	IInstanceObjectCollectionMetadata,
	IIntegrationMetadata,
} from "../features/configuration/types/Metadata/IntegrationMetadata";
import {ISelect} from "../features/configuration/types/Select";
import {IIntegration} from "../features/integration/types/Integration";
import {ContextProps} from "../util/constants/interface";
import {MOCK_INSTANCE_METADATA} from "../__tests__/mock/mapping/mock-instans-metadata";
import {sourceApplications} from "../features/configuration/defaults/DefaultValues";
import SourceApplicationRepository from "../api/SourceApplicationRepository";
import IntegrationRepository from "../api/IntegrationRepository";


type SourceApplicationContextState = {
    availableForms: ISelect[];
    getAllIntegrationsAndSetAvailableForms: (forms: ISelect[]) => void;
    getAvailableForms: () => void;
    allMetadata: IIntegrationMetadata[] | undefined;
    instanceElementMetadata: IInstanceMetadataContent | undefined;
    setInstanceElementMetadata: (instanceMetadataContent: IInstanceMetadataContent | undefined) => void;
    instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata[],
    getInstanceObjectCollectionMetadata: (key: string[]) => void,
    getAllMetadata: (onlyLatest: boolean) => void;
    getInstanceElementMetadata: (metadataId: string) => void;
    sourceApplication: number | undefined;
    setSourceApplication: (id: number | undefined) => void;
};

const contextDefaultValues: SourceApplicationContextState = {

    availableForms: [
        {value: 'null', label: 'Velg kildeapplikasjon først'}
    ],
    getAllIntegrationsAndSetAvailableForms: () => undefined,
    getAvailableForms: () => undefined,
    allMetadata: undefined,
    instanceElementMetadata: undefined,
    setInstanceElementMetadata: () => undefined,
    instanceObjectCollectionMetadata: [],
    getInstanceObjectCollectionMetadata: () => undefined,
    getAllMetadata: () => undefined,
    getInstanceElementMetadata: () => undefined,
    sourceApplication: undefined,
    setSourceApplication: () => undefined
};


const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider = ({children}: ContextProps) => {

    const [availableForms, setAvailableForms] = useState<ISelect[]>(contextDefaultValues.availableForms);
    const [allMetadata, setAllMetadata] = useState<IIntegrationMetadata[] | undefined>(contextDefaultValues.allMetadata)
    const [instanceElementMetadata, setInstanceElementMetadata] = useState<IInstanceMetadataContent | undefined>(MOCK_INSTANCE_METADATA)
    const [instanceObjectCollectionMetadata, setInstanceObjectCollectionMetadata] = useState<IInstanceObjectCollectionMetadata[]>([])
    const [sourceApplication, setSourceApplication] = useState<number | undefined>(contextDefaultValues.sourceApplication);

    function getInstanceObjectCollectionMetadata(keys: string[]): void {
        setInstanceObjectCollectionMetadata(
            keys.map((key: string) => instanceElementMetadata?.instanceObjectCollectionMetadata
                .find(instanceObjectCollectionMetadata => instanceObjectCollectionMetadata.key === key)
            ).filter((metadata): metadata is IInstanceObjectCollectionMetadata => !!metadata)
        );
    }

    const getAvailableForms = async () => {
        try {
            const sourceAppId = sourceApplication !== undefined ? sourceApplication.toString() : "2";

            const response = await SourceApplicationRepository.getMetadata(sourceAppId, true);
            const data = response.data || [];

            const selectables: ISelect[] = data.map((value: IIntegrationMetadata) => ({
                value: value.sourceApplicationIntegrationId,
                label: `[${value.sourceApplicationIntegrationId}] ${value.integrationDisplayName}`,
            }));

            await getAllIntegrationsAndSetAvailableForms(selectables);
        } catch (err) {
            console.error(err);
        }
    };

    const getAllIntegrationsAndSetAvailableForms = async (forms: ISelect[]) => {
        try {
            const response = await IntegrationRepository.getAllIntegrations();
            const data = response.data || [];

            const ids: string[] = data.map((integration: IIntegration) => integration.sourceApplicationIntegrationId);

            if (sourceApplication !== undefined) {
                const selectableForms = forms.filter((form) => !ids.includes(form.value));
                setAvailableForms(selectableForms);
            }
        } catch (err) {
            console.error(err);
            setAvailableForms([{value: 'null', label: 'No options'}]);
        }
    };


    const getAllMetadata = async (onlyLatest: boolean) => {
        try {
            const allMetadata = []

            for (const sourceApplication of sourceApplications) {
                const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplication.value, onlyLatest);
                allMetadata.push(metadataResponse.data)
            }
            const metadata = allMetadata.reduce((acc, currentArray) => [...acc, ...currentArray], []) || [];

            setAllMetadata(metadata)

        } catch (e) {
            console.error('Error: ', e);
            setAllMetadata([])
        }
    }

    const getInstanceElementMetadata = (metadataId: string) => {
        SourceApplicationRepository.getInstanceElementMetadataById(metadataId)
            .then(response => {
                const data: IInstanceMetadataContent = response.data
                if (data) {
                    setInstanceElementMetadata(data)
                }
            })
            .catch((err) => {
                setInstanceElementMetadata(undefined)
                console.error(err)
            })
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                availableForms,
                getAvailableForms,
                allMetadata,
                instanceElementMetadata,
                setInstanceElementMetadata,
                instanceObjectCollectionMetadata,
                getInstanceObjectCollectionMetadata,
                getAllMetadata,
                getInstanceElementMetadata,
                getAllIntegrationsAndSetAvailableForms,
                sourceApplication,
                setSourceApplication
            }}
        >
            {children}
        </SourceApplicationContext.Provider>
    );
};

export {SourceApplicationContext, contextDefaultValues, SourceApplicationProvider as default};