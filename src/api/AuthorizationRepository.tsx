import axios from "axios";
import {IUser} from "../components/pages/Admin";

const getAuthorized = () => {
    return axios.get("/api/intern/authorization/user/check-authorized")
};

const getUser = () => {
    return axios.get<{ admin: boolean }>("/api/intern/authorization/adminuser/check-is-admin")
};

const getUserSourceApplications = () => {
    //return axios.get<IUser>("/api/intern/authorization/user/permission")
    return {data: {sourceApplicationIds: [1,2,3,4]}}
};

const getUsers = () => {
    return axios.get<IUser[]>("/api/intern/authorization/adminuser/userpermissions")
};

const updateUsers = (data: IUser[]) => {
    return axios.post<IUser[]>("/api/intern/authorization/adminuser/userpermissions", data)
};

const AuthorizationRepository = {
    getAuthorized,
    getUser,
    getUsers,
    updateUsers,
    getUserSourceApplications
};

export default AuthorizationRepository;
