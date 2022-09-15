import axios from "axios";

const resendInstance = (instanceId: string) => {
    return axios.post<string>( `api/intern/instanser/instanceId/${instanceId}/prov-igjen`);
};

const ResourceRepository = {
    resendInstance
};

export default ResourceRepository;
