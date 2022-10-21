import React, {createContext, FC, useState} from "react";
import {contextDefaultValues, ISourceApplicationItem, SourceApplicationContextState} from "./types";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";
import {ISelect} from "../../features/integration/types/InputField";
import {IInstanceElementMetadata, IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {getSourceApplicationDisplayName} from "../../features/integration/defaults/DefaultValues";

export const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider: FC = ({children}) => {
    const [availableForms, setAvailableForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);
    const [allMetadata, setAllMetadata] = useState<IIntegrationMetadata[]>(contextDefaultValues.allMetadata)
    const [instanceElementMetadata, setInstanceElementMetadata] = useState<IInstanceElementMetadata | undefined>(undefined)
    const [sourceApplication, setSourceApplication] = useState<number | null>(contextDefaultValues.sourceApplication);


    const getAvailableForms = () => {
        SourceApplicationRepository.getMetadata(sourceApplication !== null ? sourceApplication.toString() : "1", true)
            .then(response => {
                let data = response.data
                if (data) {
                    let selects: ISelect[] = [];
                    data.forEach((value: any) => {
                        selects.push({value: value.sourceApplicationIntegrationId, label: value.integrationDisplayName})
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
                    let data: IIntegrationMetadata[] = response.data
                    if (data) {
                        setAllMetadata(data)
                    }
                })
                .catch((err) => {
                    setAllMetadata(contextDefaultValues.allMetadata)
                    setAvailableForms({sourceApplicationDisplayName: '', sourceApplicationId: '1', forms: [{value: 'null', label: 'No options'}]})
                    console.error(err);
                })
        }
    }

    const getInstanceElementMetadata = (metadataId: string) => {
        SourceApplicationRepository.getInstanceElementMetadata(metadataId)
            .then(response => {
                let data: IInstanceElementMetadata = response.data
                if(data) {
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
        IntegrationRepository.getIntegrations()
            .then(response => {
                let data = response.data;
                if (data) {
                    let ids: string[] = response.data.map((config: any) => config.sourceApplicationIntegrationId)
                    let selectableForms = forms.filter(form => !ids.includes(form.value));
                    if(sourceApplication !== null) {
                        setAvailableForms({sourceApplicationDisplayName: getSourceApplicationDisplayName(sourceApplication), sourceApplicationId: sourceApplication.toString(), forms: selectableForms})
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                setAvailableForms({sourceApplicationDisplayName: '', sourceApplicationId: '1', forms: [{value: 'null', label: 'No options'}]})
            })
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                availableForms,
                getAvailableForms,
                allMetadata,
                instanceElementMetadata,
                getAllMetadata,
                getInstanceElementMetadata,
                getAllForms,
                sourceApplication,
                setSourceApplication
            }}
        >
            {children}
        </SourceApplicationContext.Provider>
    );
};

export default SourceApplicationProvider;
