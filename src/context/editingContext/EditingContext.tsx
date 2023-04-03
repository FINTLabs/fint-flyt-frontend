import {contextDefaultValues, EditingContextState} from "./types";
import {createContext, FC, useState} from "react";

export const EditingContext = createContext<EditingContextState>(
    contextDefaultValues
);

const EditingProvider: FC = ({children}) => {
    const [editCollectionAbsoluteKey, setEditCollectionAbsoluteKey] =
        useState<string>(contextDefaultValues.editCollectionAbsoluteKey)

    return (
        <EditingContext.Provider
            value={{
                editCollectionAbsoluteKey,
                setEditCollectionAbsoluteKey
            }}
        >
            {children}
        </EditingContext.Provider>
    );
};

export default EditingProvider;
