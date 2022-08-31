import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, ISourceApplicationItem, SourceApplicationContextState} from "./types";
import {forms} from "../../features/integration/defaults/DefaultValues";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";

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

    //TODO: get all forms from sourceApplication when avaliable
    const getAllForms = () => {
        setAllForms({sourceApplication: 'acos', sourceApplicationForms: forms})
    }

    return (
        <SourceApplicationContext.Provider
            value={{
                allForms,
                availableForms,
                getForms,
                getAllForms
            }}
        >
            {children}
        </SourceApplicationContext.Provider>
    );
};

export default SourceApplicationProvider;
