
import {createContext, useState} from "react";
import { ContextProps } from "../util/constants/interface";

interface FeatureMap {
    [key: string]: boolean;
}

type ApplicationContextState = {
    features: FeatureMap,
    getFeatures: () => void
}

const contextDefaultValues: ApplicationContextState = {
    features: {},
    getFeatures: () => undefined
};


const ApplicationContext = createContext<ApplicationContextState>(
    contextDefaultValues
);

const ApplicationProvider = ({children}: ContextProps) => {
    const [features, setFeatures] = useState<FeatureMap>(contextDefaultValues.features);

    function getFeatures() {
        //TODO: connect to feature toggle api ... await FeatureToggleRepository.getFeatures() ... => setFeatures(response)...
        setFeatures({
            test1: true,
            test2: false,
        })
    }

    return (
        <ApplicationContext.Provider
            value={{
                features,
                getFeatures,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};

export {ApplicationContext, ApplicationProvider as default};
