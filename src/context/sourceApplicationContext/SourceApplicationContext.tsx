import React, { createContext, useState, FC } from "react";
import {
    contextDefaultValues,
    ISourceApplicationItem,
    SourceApplicationContextState
} from "./types";
import {forms} from "../../features/integration/defaults/DefaultValues";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";

export const SourceApplicationContext = createContext<SourceApplicationContextState>(
    contextDefaultValues
);

const SourceApplicationProvider: FC = ({ children }) => {
    const [availableForms, setAvailableForms] = useState<ISourceApplicationItem>(contextDefaultValues.availableForms);


    const getForms = () => {
        IntegrationRepository.get()
            .then(response => {
                let ids: string[] = response.data.content.map((config: any) => config.sourceApplicationIntegrationId)
                let selectableForms = forms.filter(form => !ids.includes(form.value));
                setAvailableForms({sourceApplication: 'acos', sourceApplicationForms: selectableForms})
            })
            .catch((err) => {
                console.error(err);
            })
    }

    //TODO: get all forms from sourceApplication when avaliable
    const getAllForms = () => {
        return;
    }

    return (
        <SourceApplicationContext.Provider
            value={{
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
