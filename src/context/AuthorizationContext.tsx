import { createContext, useCallback, useMemo, useState } from 'react';
import { ContextProps } from './constants/interface';
import useAuthorizationRepository from '../api/useAuthorizationRepository';
import { ISourceApplication } from '../features/configuration/types/SourceApplication';

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
    getAllSourceApplications: (filterByAvailable: boolean) => Promise<ISourceApplication[]>;
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
    logoutUrl: undefined,
    getAllSourceApplications: async () => [],
};

const AuthorizationContext = createContext<AuthorizationContextState>(contextDefaultValues);

const AuthorizationProvider = ({ children, basePath }: ContextProps & { basePath?: string }) => {
    const AuthorizationRepository = useAuthorizationRepository();
    const [authorized, setAuthorized] = useState<boolean | undefined>(
        contextDefaultValues.authorized
    );
    const [hasAccessToUserPermissionPage, sethasAccessToUserPermissionPage] = useState<
        boolean | undefined
    >(contextDefaultValues.hasAccessToUserPermissionPage);

    const [activeUserSourceApps, setActiveUserSourceApps] = useState<string[] | undefined>(
        undefined
    );

    const [sourceApplications, setSourceApplications] = useState<
        ISourceApplication[] | undefined
    >();

    const logoutUrl = useMemo(() => `${basePath}/_oauth/logout`, [basePath]);
    const tokenUrl = useMemo(() => `${basePath}/_oauth`, [basePath]);
    const fint_access_token_Url = useMemo(() => 'https://idp.felleskomponent.no/nidp/oauth/nam/token', []);

    const getAccessToken = async () => {
        try {
            const response = await fetch(`${basePath}/_oauth`);

            if (!response.ok) {
                throw new Error('Kunne ikke hente token');
            }

            const data = await response.json();

            console.log("DATA:", data);

            return data.access_token;
        } catch (error) {
            console.error('Feil ved henting av token', error);
            return undefined;
        }

    }

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
            const response = AuthorizationRepository.getUserSourceApplications();
            const stringArray = (await response).data.sourceApplicationIds.map((id) => String(id));
            setActiveUserSourceApps(stringArray);
        } catch (err) {
            setActiveUserSourceApps([]);
        }
    };

    const getAllSourceApplications = useCallback(
        async (filterByAvailable: boolean): Promise<ISourceApplication[]> => {
            if (sourceApplications) {
                return filterByAvailable
                    ? sourceApplications.filter((sa) => sa.available)
                    : sourceApplications;
            } else {
                try {
                    return AuthorizationRepository.getSourceApplications().then((response) => {
                        setSourceApplications(response.data);
                        return filterByAvailable
                            ? response.data.filter((sa) => sa.available)
                            : response.data;
                    });
                } catch (error) {
                    console.log(error);
                    return [];
                }
            }
        },
        [sourceApplications]
    );

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
                logoutUrl,
                getAllSourceApplications,
            }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};

export { AuthorizationContext, AuthorizationProvider as default };
