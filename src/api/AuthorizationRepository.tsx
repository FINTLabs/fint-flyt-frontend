import axios from "axios";
import {IUser} from "../components/pages/Admin";

const getAuthorized = () => {
    return axios.get("/api/intern/authorization/check-authorized")
};

const getUser = () => {
    return axios.get<{ admin: boolean }>("/api/intern/authorization/user")
};

const getUsers = () => {
    return axios.get<IUser[]>("/api/intern/authorization/users")
};

const updateUsers = (data: IUser[]) => {
    return axios.put<{ admin: boolean }>("/api/intern/authorization/user", data)
};

const AuthorizationRepository = {
    getAuthorized,
    getUser,
    getUsers,
    updateUsers
};

export default AuthorizationRepository;
