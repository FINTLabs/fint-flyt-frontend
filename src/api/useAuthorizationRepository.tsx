import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import { Page } from '../components/types/TableTypes';
import { IUser } from '../components/types/UserTypes';
import { ISourceApplication } from '../features/configuration/types/SourceApplication';

const API_URL = import.meta.env.VITE_API_AUTH || '';

export default function useAuthorizationRepository() {
    const { get, post } = useContext(ApiAdapterContext);

    const getAuthorized = () => {
        return get(API_URL, '/api/intern/authorization/me/is-authorized', {
            headers: new Headers({ 'Content-Type': ' text/plain' }),
        });
    };

    const getUser = () => {
        return get<{ userPermissionPage: boolean }>(
            API_URL,
            '/api/intern/authorization/me/restricted-page-authorization'
        );
    };

    const getUserSourceApplications = () => {
        return get<IUser>(API_URL, '/api/intern/authorization/me');
    };

    const getSourceApplications = () => {
        return get<ISourceApplication[]>(API_URL, '/api/intern/authorization/sourceapplications');
    };

    const getUsers = (page = 0, size = 10) => {
        return get<Page<IUser>>(API_URL, `/api/intern/authorization/users`, {
            params: {
                page,
                size,
            },
        });
    };

    const updateUsers = (data: IUser[]) => {
        return post<IUser[]>(
            API_URL,
            '/api/intern/authorization/users/actions/userPermissionBatchPut',
            data
        );
    };

    return {
        getAuthorized,
        getUser,
        getUsers,
        updateUsers,
        getUserSourceApplications,
        getSourceApplications,
    };
}
