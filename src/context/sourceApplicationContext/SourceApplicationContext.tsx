import React, {createContext, FC, useState} from "react";
import {contextDefaultValues, ISourceApplicationItem, SourceApplicationContextState} from "./types";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {getSourceApplicationDisplayName} from "../../features/configuration/defaults/DefaultValues";
import {
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IIntegrationMetadata,
    MOCK_INSTANCE_METADATA
} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import {ISelect} from "../../features/configuration/types/Select";
import {IIntegration} from "../../features/integration/types/Integration";

export const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider: FC = ({children}) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(contextDefaultValues.isAdmin)
    const [availableForms, setAvailableForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);
    const [allMetadata, setAllMetadata] = useState<IIntegrationMetadata[]>(contextDefaultValues.allMetadata)
    const [instanceElementMetadata, setInstanceElementMetadata] = useState<IInstanceMetadataContent | undefined>(MOCK_INSTANCE_METADATA.instanceMetadata)
    const [instanceObjectCollectionMetadata, setInstanceObjectCollectionMetadata] = useState<IInstanceObjectCollectionMetadata[]>([])
    const [sourceApplication, setSourceApplication] = useState<number | undefined>(contextDefaultValues.sourceApplication);
    const [timeOut, setTimeOut] = useState<boolean>(contextDefaultValues.timeOut)


    function getInstanceObjectCollectionMetadata(keys: string[]): void {
        setInstanceObjectCollectionMetadata(
            keys.map((key: string) => instanceElementMetadata?.instanceObjectCollectionMetadata
                .find(instanceObjectCollectionMetadata => instanceObjectCollectionMetadata.key === key)
            ).filter((metadata): metadata is IInstanceObjectCollectionMetadata => !!metadata)
        );
    }

    const getAvailableForms = () => {
        SourceApplicationRepository.getMetadata(sourceApplication !== undefined ? sourceApplication.toString() : "2", true)
            .then(response => {
                const data = response.data
                if (data) {
                    const selects: ISelect[] = [];
                    data.forEach((value: IIntegrationMetadata) => {
                        selects.push({
                            value: value.sourceApplicationIntegrationId,
                            label: '[' + value.sourceApplicationIntegrationId + '] ' + value.integrationDisplayName
                        })
                    })
                    getAllForms(selects)
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getAllMetadata = (onlyLatest: boolean) => {
        if (sourceApplication) {
            SourceApplicationRepository.getMetadata(sourceApplication.toString(), onlyLatest)
                .then(response => {
                    const data: IIntegrationMetadata[] = response.data
                    if (data) {
                        setAllMetadata(data)
                    }
                })
                .catch((err) => {
                    setAllMetadata(contextDefaultValues.allMetadata)
                    setAvailableForms({
                        sourceApplicationDisplayName: '',
                        sourceApplicationId: '1',
                        forms: [{value: 'null', label: 'No options'}]
                    })
                    console.error(err);
                })
        }
    }

    const getInstanceElementMetadata = (metadataId: string) => {
        SourceApplicationRepository.getInstanceElementMetadata(metadataId)
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

    //TODO: get all forms from sourceApplication when available
    const getAllForms = (forms: ISelect[]) => {
        IntegrationRepository.getAllIntegrations()
            .then(response => {
                const data = response.data;
                if (data) {
                    const ids: string[] = data.map((integration: IIntegration) => integration.sourceApplicationIntegrationId)
                    const selectableForms = forms.filter(form => !ids.includes(form.value));
                    if (sourceApplication !== undefined) {
                        setAvailableForms({
                            sourceApplicationDisplayName: getSourceApplicationDisplayName(sourceApplication),
                            sourceApplicationId: sourceApplication.toString(),
                            forms: selectableForms
                        })
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                setAvailableForms({
                    sourceApplicationDisplayName: '',
                    sourceApplicationId: '1',
                    forms: [{value: 'null', label: 'No options'}]
                })
            })
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                isAdmin,
                setIsAdmin,
                availableForms,
                getAvailableForms,
                allMetadata,
                instanceElementMetadata,
                setInstanceElementMetadata,
                instanceObjectCollectionMetadata,
                getInstanceObjectCollectionMetadata,
                getAllMetadata,
                getInstanceElementMetadata,
                getAllForms,
                sourceApplication,
                setSourceApplication,
                timeOut,
                setTimeOut
            }}
        >
            {children}
        </SourceApplicationContext.Provider>
    );
};

export default SourceApplicationProvider;