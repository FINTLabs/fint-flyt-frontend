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
    activeUserSourceApps: string[] | undefined,
    getActiveUserSourceApps: () => void
};

const contextDefaultValues: AuthorizationContextState = {
    authorized: undefined,
    setAuthorized: () => undefined,
    getAuthorization: () => undefined,
    isAdmin: undefined,
    setIsAdmin: () => undefined,
    getUser: () => undefined,
    activeUserSourceApps: undefined,
    getActiveUserSourceApps: () => undefined
};

const AuthorizationContext = createContext<AuthorizationContextState>(contextDefaultValues);

const AuthorizationProvider = ({children}: ContextProps) => {
    const [authorized, setAuthorized] = useState<boolean | undefined>(contextDefaultValues.authorized);
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(contextDefaultValues.isAdmin);
    const [activeUserSourceApps, setActiveUserSourceApps] = useState<string[] | undefined>(undefined);

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

    const getActiveUserSourceApps = async () => {
        try {
            const response = AuthorizationRepository.getUserSourceApplications()
            const stringArray = response.data.sourceApplicationIds.map(String)
            setActiveUserSourceApps(stringArray)
        } catch (err) {
            setActiveUserSourceApps([])
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
                getUser,
                activeUserSourceApps,
                getActiveUserSourceApps
            }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};

export {AuthorizationContext, AuthorizationProvider as default};
