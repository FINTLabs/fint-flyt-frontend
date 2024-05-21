import axios from "axios";
import {IUser} from "../components/pages/Admin";

const getAuthorized = () => {
    return axios.get("/api/intern/authorization/check-authorized")
};

const getUser = () => {
    return axios.get<{ admin: boolean }>("/api/intern/authorization/user")
};

const updateUsers = (data: IUser[]) => {
    return axios.put<{ admin: boolean }>("/api/intern/authorization/user", data)
};

const AuthorizationRepository = {
    getAuthorized,
    getUser,
    updateUsers
};

export default AuthorizationRepository;
