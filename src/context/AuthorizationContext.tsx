import { createContext, useState } from "react";
import { ContextProps } from "./constants/interface";
import AuthorizationRepository from "../api/AuthorizationRepository";

type AuthorizationContextState = {
    authorized: boolean | undefined;
    setAuthorized: (authorized: boolean) => void;
    getAuthorization: () => void;
};

const contextDefaultValues: AuthorizationContextState = {
    authorized: undefined,
    setAuthorized: () => undefined,
    getAuthorization: () => undefined
};

const AuthorizationContext = createContext<AuthorizationContextState>(contextDefaultValues);

const AuthorizationProvider = ({ children }: ContextProps) => {
    const [authorized, setAuthorized] = useState<boolean | undefined>(contextDefaultValues.authorized);

    const getAuthorization = async () => {
        try {
            const response = await AuthorizationRepository.getAuthorized()
            if(response.status === 200 && response.data === 'User authorized') {
                setAuthorized(true)
            }
        } catch (err) {
            setAuthorized(false)
        }
    }

    return (
        <AuthorizationContext.Provider
            value={{
                authorized,
                setAuthorized,
                getAuthorization
            }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};

export { AuthorizationContext, AuthorizationProvider as default };
