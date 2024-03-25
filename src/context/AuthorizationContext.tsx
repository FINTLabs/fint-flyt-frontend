import {createContext, useState} from "react";
import {ContextProps} from "./constants/interface";
import AuthorizationRepository from "../api/AuthorizationRepository";

type AuthorizationContextState = {
    authorized: boolean | undefined;
    setAuthorized: (authorized: boolean) => void;
    getAuthorization: () => void;
    isAdmin: boolean | undefined;
    setIsAdmin: (admin: boolean) => void;
    getUser: () => void
};

const contextDefaultValues: AuthorizationContextState = {
    authorized: undefined,
    setAuthorized: () => undefined,
    getAuthorization: () => undefined,
    isAdmin: undefined,
    setIsAdmin: () => undefined,
    getUser: () => undefined
};

const AuthorizationContext = createContext<AuthorizationContextState>(contextDefaultValues);

const AuthorizationProvider = ({children}: ContextProps) => {
    const [authorized, setAuthorized] = useState<boolean | undefined>(contextDefaultValues.authorized);
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(contextDefaultValues.isAdmin);

    const getAuthorization = async () => {
        try {
            const response = await AuthorizationRepository.getAuthorized()
            if (response.status === 200 && response.data === 'User authorized') {
                setAuthorized(true)
            } else {
                setAuthorized(false)
            }
        } catch (err) {
            setAuthorized(false)
        }
    }

    const getUser = async () => {
        try {
            const response = await AuthorizationRepository.getUser()
            response.data.admin ? setIsAdmin(true) : setIsAdmin(false)
        } catch (err) {
            setIsAdmin(false)
        }
    }

    return (
        <AuthorizationContext.Provider
            value={{
                authorized,
                setAuthorized,
                getAuthorization,
                isAdmin,
                setIsAdmin,
                getUser
            }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};

export {AuthorizationContext, AuthorizationProvider as default};
