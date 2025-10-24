import apiAdapter from "../../../api/apiAdapter";

const resendInstance = (instanceId: string) => {
    return apiAdapter.post<string>(`/api/intern/handlinger/instanser/${instanceId}/prov-igjen`)
};


const InstanceRepository = {
    resendInstance
};

export default InstanceRepository;
