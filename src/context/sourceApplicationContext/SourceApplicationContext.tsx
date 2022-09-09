import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, ISourceApplicationItem, SourceApplicationContextState} from "./types";
import {forms} from "../../features/integration/defaults/DefaultValues";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import SourceApplicationRepository from "../../features/integration/repository/SourceApplicationRepository";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider: FC = ({ children }) => {
    const [allForms, setAllForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);
    const [availableForms, setAvailableForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);


    const getForms = () => {
        IntegrationRepository.get()
            .then(response => {
                let ids: string[] = response.data.content.map((config: IIntegrationConfiguration) => config.sourceApplicationIntegrationId)
                setAllForms({sourceApplication: 'acos', sourceApplicationForms: forms})
                let selectableForms = forms.filter(form => !ids.includes(form.value));
                setAvailableForms({sourceApplication: 'acos', sourceApplicationForms: selectableForms})
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getMetadata = () => {
        //TODO:
    }

    //TODO: get all forms from sourceApplication when available
    const getAllForms = () => {
        SourceApplicationRepository.getMetadata()
            .then(response => {
                let data: Map<string, IIntegrationMetadata> = response.data;
                //TODO: data.forEach, new ISelect[] -> {data.integrationDisplayName = label, data.sourceApplicationIntegrationId = value} replace "forms"
                setAllForms({sourceApplication: 'acos', sourceApplicationForms: forms})

            })
            .catch((err)=> {
                console.error(err);
            })
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                allForms,
                availableForms,
                getForms,
                getMetadata,
                getAllForms
            }}
        >
            {children}
        </SourceApplicationContext.Provider>
    );
};

export default SourceApplicationProvider;
