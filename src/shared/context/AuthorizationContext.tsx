import { createContext, useCallback, useMemo, useRef, useState } from 'react';

import { ISourceApplication } from '../../features/configuration/types/SourceApplication';
import useAuthorizationRepository from '../api/useAuthorizationRepository';
import { ContextProps } from './constants/interface';

type AuthorizationContextState = {
    authorized: boolean | undefined;
    setAuthorized: (authorized: boolean) => void;
    getAuthorization: () => void;
    hasAccessToUserPermissionPage: boolean | undefined;
    sethasAccessToUserPermissionPage: (admin: boolean) => void;
    getUser: () => void;
    activeUserSourceApps: string[] | undefined;
    getActiveUserSourceApps: () => Promise<string[]>;
    logoutUrl?: string;
    getAllSourceApplications: (filterByAvailable: boolean) => Promise<ISourceApplication[]>;
    getSourceApplicationsForUser: () => Promise<ISourceApplication[]>;
};

const contextDefaultValues: AuthorizationContextState = {
    authorized: undefined,
    setAuthorized: () => undefined,
    getAuthorization: () => undefined,
    hasAccessToUserPermissionPage: undefined,
    sethasAccessToUserPermissionPage: () => undefined,
    getUser: () => undefined,
    activeUserSourceApps: undefined,
    getActiveUserSourceApps: async () => [],
    logoutUrl: undefined,
    getAllSourceApplications: async () => [],
    getSourceApplicationsForUser: async () => [],
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
    const activeUserSourceAppsRequestRef = useRef<Promise<string[]> | null>(null);

    const [sourceApplications, setSourceApplications] = useState<
        ISourceApplication[] | undefined
    >();
    const sourceApplicationsRequestRef = useRef<Promise<ISourceApplication[]> | null>(null);

    const logoutUrl = useMemo(() => `${basePath}/_oauth/logout`, [basePath]);

    const getAuthorization = async () => {
        try {
            const response = await AuthorizationRepository.getAuthorized();
            if (response.status === 200 && response.data === 'User authorized') {
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        } catch {
            setAuthorized(false);
        }
    };

    const getActiveUserSourceApps = useCallback(async (): Promise<string[]> => {
        if (activeUserSourceApps !== undefined) {
            return activeUserSourceApps;
        }

        if (!activeUserSourceAppsRequestRef.current) {
            activeUserSourceAppsRequestRef.current = AuthorizationRepository.getUserData()
                .then((response) => {
                    const stringArray = response.data.sourceApplicationIds.map((id) =>
                        String(id)
                    );
                    setActiveUserSourceApps(stringArray);
                    return stringArray;
                })
                .catch(() => {
                    activeUserSourceAppsRequestRef.current = null;
                    setActiveUserSourceApps([]);
                    return [];
                });
        }

        return activeUserSourceAppsRequestRef.current;
    }, [activeUserSourceApps]);

    const getAllSourceApplications = useCallback(
        async (filterByAvailable: boolean): Promise<ISourceApplication[]> => {
            const applyFilter = (apps: ISourceApplication[]) =>
                filterByAvailable ? apps.filter((sa) => sa.available) : apps;

            if (sourceApplications) {
                return applyFilter(sourceApplications);
            }

            if (!sourceApplicationsRequestRef.current) {
                sourceApplicationsRequestRef.current = AuthorizationRepository.getSourceApplications()
                    .then((response) => {
                        setSourceApplications(response.data);
                        return response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        sourceApplicationsRequestRef.current = null;
                        return [];
                    });
            }

            return applyFilter(await sourceApplicationsRequestRef.current);
        },
        [sourceApplications]
    );

    const getSourceApplicationsForUser = useCallback(async (): Promise<ISourceApplication[]> => {
        const [apps, userAppIds] = await Promise.all([
            getAllSourceApplications(true),
            getActiveUserSourceApps(),
        ]);

        return apps.filter((sa) => userAppIds.includes(sa.id.toString()));
    }, [getAllSourceApplications, getActiveUserSourceApps]);

    const getUser = async () => {
        try {
            const response = await AuthorizationRepository.getUser();
            if (response.data.userPermissionPage) {
                sethasAccessToUserPermissionPage(true);
            } else {
                sethasAccessToUserPermissionPage(false);
            }
        } catch {
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
                getSourceApplicationsForUser,
            }}
        >
            {children}
        </AuthorizationContext.Provider>
    );
};

export { AuthorizationContext, AuthorizationProvider as default };
