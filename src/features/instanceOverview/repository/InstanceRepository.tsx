import axios from "axios";

const resendInstance = (instanceId: string) => {
    return axios.post<string>(`api/intern/handlinger/instanser/${instanceId}/prov-igjen`)
};


const InstanceRepository = {
    resendInstance
};

export default InstanceRepository;
