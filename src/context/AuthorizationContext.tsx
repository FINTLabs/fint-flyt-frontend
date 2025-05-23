import { createContext, useMemo, useState } from 'react';
import { ContextProps } from './constants/interface';
import AuthorizationRepository from '../api/AuthorizationRepository';
import { AxiosResponse } from 'axios';

type AuthorizationContextState = {
    authorized: boolean | undefined;
    setAuthorized: (authorized: boolean) => void;
    getAuthorization: () => void;
    hasAccessToUserPermissionPage: boolean | undefined;
    sethasAccessToUserPermissionPage: (admin: boolean) => void;
    getUser: () => void;
    activeUserSourceApps: string[] | undefined;
    getActiveUserSourceApps: () => void;
    logoutUrl?: string;
};

const contextDefaultValues: AuthorizationContextState = {
    authorized: undefined,
    setAuthorized: () => undefined,
    getAuthorization: () => undefined,
    hasAccessToUserPermissionPage: undefined,
    sethasAccessToUserPermissionPage: () => undefined,
    getUser: () => undefined,
    activeUserSourceApps: undefined,
    getActiveUserSourceApps: () => undefined,
    logoutUrl: undefined
};

const AuthorizationContext = createContext<AuthorizationContextState>(contextDefaultValues);

const AuthorizationProvider = ({ children, basePath }: ContextProps & { basePath?: string }) => {
    const [authorized, setAuthorized] = useState<boolean | undefined>(
        contextDefaultValues.authorized
    );
    const [hasAccessToUserPermissionPage, sethasAccessToUserPermissionPage] = useState<
        boolean | undefined
    >(contextDefaultValues.hasAccessToUserPermissionPage);
    const [activeUserSourceApps, setActiveUserSourceApps] = useState<string[] | undefined>(
        undefined
    );
    const logoutUrl = useMemo(() => `${basePath}/_oauth/logout`, [basePath]);

    const getAuthorization = async () => {
        try {
            const response = await AuthorizationRepository.getAuthorized();
            if (response.status === 200 && response.data === 'User authorized') {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        } catch (err) {
            setAuthorized(false);
        }
    };

    const getActiveUserSourceApps = async (): Promise<void> => {
        try {
            const response: Promise<AxiosResponse<{ sourceApplicationIds: number[] }>> =
                AuthorizationRepository.getUserSourceApplications();
            const stringArray = (await response).data.sourceApplicationIds.map((id) => String(id));
            setActiveUserSourceApps(stringArray);
        } catch (err) {
            setActiveUserSourceApps([]);
        }
    };

    const getUser = async () => {
        try {
            const response = await AuthorizationRepository.getUser();
            response.data.userPermissionPage
                ? sethasAccessToUserPermissionPage(true)
                : sethasAccessToUserPermissionPage(false);
        } catch (err) {
            sethasAccessToUserPermissionPage(false);
        }
    };

    return (
        <AuthorizationContext.Provider
            value={{
                authorized,
                setAuthorized,
                getAuthorization,
                hasAccessToUserPermissionPage,
                sethasAccessToUserPermissionPage,
                getUser,
                activeUserSourceApps,
                getActiveUserSourceApps,
                logoutUrl
            }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export { AuthorizationContext, AuthorizationProvider as default };
