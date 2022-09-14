import React, {createContext, FC, useState} from "react";
import {contextDefaultValues, ISourceApplicationItem, SourceApplicationContextState} from "./types";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import SourceApplicationRepository from "../../features/integration/repository/SourceApplicationRepository";
import {ISelect} from "../../features/integration/types/InputField";

export const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider: FC = ({children}) => {
    const [sourceApplicationForms, setSourceApplicationForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);
    const [availableForms, setAvailableForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);


    const getAvailableForms = () => {
        SourceApplicationRepository.getMetadata("1")
            .then(response => {
                let data = response.data
                let selects: ISelect[] = [];
                data.forEach((value: any) => {
                    selects.push({value: value.sourceApplicationIntegrationId, label: value.sourceApplicationIntegrationId + ' - ' + value.integrationDisplayName})
                })
                setSourceApplicationForms({sourceApplication: 'acos', sourceApplicationForms: selects})
                getAllForms(selects)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const getMetadata = () => {
        //TODO:
    }

    //TODO: get all forms from sourceApplication when available
    const getAllForms = (forms: ISelect[]) => {
        IntegrationRepository.get()
            .then(response => {
                let ids: string[] = response.data.content.map((config: IIntegrationConfiguration) => config.sourceApplicationIntegrationId)
                let selectableForms = forms.filter(form => !ids.includes(form.value));
                setAvailableForms({sourceApplication: 'acos', sourceApplicationForms: selectableForms})
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                allForms: sourceApplicationForms,
                availableForms,
                getAvailableForms,
                getMetadata,
                getAllForms
            }}
        >
            {children}
        </SourceApplicationContext.Provider>
    );
};

export default SourceApplicationProvider;
