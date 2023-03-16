import {ConfigurationContextState, contextDefaultValues} from "./types";
import {createContext, FC, useState} from "react";


export const ConfigurationContext = createContext<ConfigurationContextState>(
    contextDefaultValues
);

const ConfigurationProvider: FC = ({children}) => {
    const [completed, setCompleted] = useState<boolean>(contextDefaultValues.completed);
    const [active, setActive] = useState<boolean>(contextDefaultValues.active);
    //TODO: set valgt metadata vedlegg

    return (
        <ConfigurationContext.Provider
            value={{
                completed,
                setCompleted,
                active,
                setActive
            }}
        >
            {children}
        </ConfigurationContext.Provider>
    );
};

export default ConfigurationProvider;
