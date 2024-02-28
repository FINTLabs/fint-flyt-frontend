import axios from "axios";

const getAuthorized = () => {
    return axios.get("/api/intern/authorization/check-authorized")
};

const AuthorizationRepository = {
    getAuthorized
};

export default AuthorizationRepository;
