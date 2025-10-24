import apiAdapter from './apiAdapter';
import { IUser, PageableResponse } from '../components/pages/UserAccess';

const getAuthorized = () => {
    return apiAdapter.get('/api/intern/authorization/me/is-authorized');
};

const getUser = () => {
    return apiAdapter.get<{ userPermissionPage: boolean }>(
        '/api/intern/authorization/me/restricted-page-authorization'
    );
};

const getUserSourceApplications = () => {
    return apiAdapter.get<IUser>('/api/intern/authorization/me');
};

const getUsers = (page = 0, size = 10) => {
    return apiAdapter.get<PageableResponse<IUser>>(`/api/intern/authorization/users`, {
        params: {
            page,
            size,
        },
    });
};

const updateUsers = (data: IUser[]) => {
    return apiAdapter.post<IUser[]>(
        '/api/intern/authorization/users/actions/userPermissionBatchPut',
        data
    );
};

const AuthorizationRepository = {
    getAuthorized,
    getUser,
    getUsers,
    updateUsers,
    getUserSourceApplications,
};

export default AuthorizationRepository;
