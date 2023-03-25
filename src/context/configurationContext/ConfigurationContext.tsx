import {ConfigurationContextState, contextDefaultValues} from "./types";
import {createContext, FC, useState} from "react";


export const ConfigurationContext = createContext<ConfigurationContextState>(
    contextDefaultValues
);

const ConfigurationProvider: FC = ({children}) => {
    const [completed, setCompleted] = useState<boolean>(contextDefaultValues.completed);
    const [active, setActive] = useState<boolean>(contextDefaultValues.active);
    const [editCollectionAbsoluteKey, setEditCollectionAbsoluteKey] =
        useState<string>(contextDefaultValues.editCollectionAbsoluteKey)

    return (
        <ConfigurationContext.Provider
            value={{
                completed,
                setCompleted,
                active,
                setActive,
                editCollectionAbsoluteKey,
                setEditCollectionAbsoluteKey
            }}
        >
            {children}
        </ConfigurationContext.Provider>
    );
};

export default ConfigurationProvider;
