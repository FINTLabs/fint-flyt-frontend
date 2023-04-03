import {ConfigurationContextState, contextDefaultValues} from "./types";
import {createContext, FC, useState} from "react";

export const ConfigurationContext = createContext<ConfigurationContextState>(
    contextDefaultValues
);

const ConfigurationProvider: FC = ({children}) => {
    const [completed, setCompleted] = useState<boolean>(contextDefaultValues.completed);
    const [active, setActive] = useState<boolean>(contextDefaultValues.active);

    function resetConfigurationContext() {
        setCompleted(contextDefaultValues.completed)
    }

    return (
        <ConfigurationContext.Provider
            value={{
                completed,
                setCompleted,
                resetConfigurationContext,
                active,
                setActive
            }}
        >
            {children}
        </ConfigurationContext.Provider>
    );
};

export default ConfigurationProvider;
