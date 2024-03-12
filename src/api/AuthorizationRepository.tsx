import axios from "axios";

const getAuthorized = () => {
    return axios.get("/api/intern/authorization/check-authorized")
};

const getUser = () => {
    return axios.get<{ admin: boolean }>("/api/intern/authorization/user")
};

const AuthorizationRepository = {
    getAuthorized,
    getUser
};

export default AuthorizationRepository;
