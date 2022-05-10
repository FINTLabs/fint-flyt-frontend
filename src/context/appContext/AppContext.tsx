import React, { createContext, useState, FC } from "react";
import {AppContextState, contextDefaultValues} from "./types";

export const AppContext = createContext<AppContextState>(
    contextDefaultValues
);

const AppProvider: FC = ({ children }) => {
   const [connectionError, setConnectionError] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{
                connectionError: connectionError,
                setConnectionError: setConnectionError
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
