import axios from "axios";
import {IConfigurationPatch, newIConfiguration} from "../../features/integration/types/Configuration";

//TODO: test with updated API urls
const getConfigurations = (integrationId: string) => {
    return axios.get<any>('/api/intern/konfigurasjoner/', { params: { integrasjonId: integrationId } });
}
const getConfiguration = (configurationId: string, includeElements?: boolean) => {
    return axios.get<any>(`/api/intern/konfigurasjoner/${configurationId}`, { params: { inkluderElementer: includeElements } });
}
const createConfiguration = (integrationId: string, data: newIConfiguration) => {
    return axios.post<any>(`/api/intern/konfigurasjoner`, data);
}
const updateConfiguration = (configurationId: string, data: IConfigurationPatch) => {
    return axios.patch<any>(`/api/intern/konfigurasjoner/${configurationId}`, data);
}
const deleteConfiguration = (configurationId: string) => {
    return axios.delete<any>(`/api/intern/konfigurasjoner/${configurationId}`);
}


const ConfigurationRepository = {
    createConfiguration,
    updateConfiguration,
    getConfigurations,
    getConfiguration,
    deleteConfiguration
};

export default ConfigurationRepository;
