import axios from "axios";
import {IUser} from "../components/pages/Admin";

const getAuthorized = () => {
    return axios.get("/api/intern/authorization/me/is-authorized")
};

const getUser = () => {
    return axios.get<{ admin: boolean }>("/api/intern/authorization/me/restricted-page-authorization")
};

const getUserSourceApplications = () => {
    //return axios.get<IUser>("/api/intern/authorization/user/permission")
    return {data: {sourceApplicationIds: [1,2,3,4]}}
};

const getUsers = () => {
    return axios.get<IUser[]>("/api/intern/authorization/users")
};

const updateUsers = (data: IUser[]) => {
    return axios.post<IUser[]>("/api/intern/authorization/users/actions/userPermissionBatchPut", data)
};

const AuthorizationRepository = {
    getAuthorized,
    getUser,
    getUsers,
    updateUsers,
    getUserSourceApplications
};

export default AuthorizationRepository;
