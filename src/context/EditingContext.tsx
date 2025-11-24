import { createContext, useState } from 'react';
import { ContextProps } from './constants/interface';

type EditingContextState = {
    editCollectionAbsoluteKey: string;
    setEditCollectionAbsoluteKey: (absoluteKey: string) => void;
};

const contextDefaultValues: EditingContextState = {
    editCollectionAbsoluteKey: '',
    setEditCollectionAbsoluteKey: () => undefined,
};

const EditingContext = createContext<EditingContextState>(contextDefaultValues);

const EditingProvider = ({ children }: ContextProps) => {
    const [editCollectionAbsoluteKey, setEditCollectionAbsoluteKey] = useState<string>(
        contextDefaultValues.editCollectionAbsoluteKey
    );

    return (
        <EditingContext.Provider
            value={{
                editCollectionAbsoluteKey,
                setEditCollectionAbsoluteKey,
            }}
        >
            {children}
        </EditingContext.Provider>
    );
};

export { EditingContext, EditingProvider as default };
