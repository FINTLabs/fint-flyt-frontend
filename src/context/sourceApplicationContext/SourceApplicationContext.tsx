import React, {createContext, FC, useState} from "react";
import {contextDefaultValues, ISourceApplicationItem, SourceApplicationContextState} from "./types";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";
import {ISelect} from "../../features/integration/types/InputField";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {getSourceApplicationDisplayName} from "../../features/integration/defaults/DefaultValues";

export const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider: FC = ({children}) => {
    const [availableForms, setAvailableForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);
    const [metadata, setMetadata] = useState<IIntegrationMetadata[]>(contextDefaultValues.metadata)
    const [sourceApplication, setSourceApplication] = useState<string | null>(contextDefaultValues.sourceApplication);


    const getAvailableForms = () => {
        SourceApplicationRepository.getMetadata(sourceApplication !== null ? sourceApplication : "1")
            .then(response => {
                let data = response.data
                let selects: ISelect[] = [];
                data.forEach((value: any) => {
                    selects.push({value: value.sourceApplicationIntegrationId, label: value.integrationDisplayName})
                })
                getAllForms(selects)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getMetadata = () => {
        if (sourceApplication) {
            SourceApplicationRepository.getMetadata(sourceApplication)
                .then(response => {
                    let data: IIntegrationMetadata[] = response.data
                    setMetadata(data)
                })
                .catch((err) => {
                    console.error(err);
                })
        }

    }

    //TODO: get all forms from sourceApplication when available
    const getAllForms = (forms: ISelect[]) => {
        IntegrationRepository.getIntegrations()
            .then(response => {
                let ids: string[] = response.data.map((config: any) => config.sourceApplicationIntegrationId)
                let selectableForms = forms.filter(form => !ids.includes(form.value));
                if(sourceApplication !== null) {
                    setAvailableForms({sourceApplicationDisplayName: getSourceApplicationDisplayName(sourceApplication), sourceApplicationId: sourceApplication, forms: selectableForms})
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                availableForms,
                getAvailableForms,
                metadata,
                getMetadata,
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
