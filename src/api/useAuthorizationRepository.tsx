import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import { Page } from '../components/types/TableTypes';
import { IUser } from '../components/types/UserTypes';

export default function useAuthorizationRepository() {
    const { get, post } = useContext(ApiAdapterContext);

    const getAuthorized = () => {
        return get('api/intern/authorization/me/is-authorized', {
            headers: new Headers({ 'Content-Type': ' text/plain' }),
        });
    };

    const getUser = () => {
        return get<{ userPermissionPage: boolean }>(
            'api/intern/authorization/me/restricted-page-authorization'
        );
    };

    const getUserSourceApplications = () => {
        return get<IUser>('api/intern/authorization/me');
    };

    const getUsers = (page = 0, size = 10) => {
        return get<Page<IUser>>(`api/intern/authorization/users`, {
            params: {
                page,
                size,
            },
        });
    };

    const updateUsers = (data: IUser[]) => {
        return post<IUser[]>(
            'api/intern/authorization/users/actions/userPermissionBatchPut',
            data
        );
    };

    return {
        getAuthorized,
        getUser,
        getUsers,
        updateUsers,
        getUserSourceApplications,
    };
}
