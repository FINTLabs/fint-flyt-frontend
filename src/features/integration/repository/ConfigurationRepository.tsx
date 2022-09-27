import axios from "axios";
import {IConfigurationPatch, newIConfiguration} from "../types/Configuration";

//TODO: test with updated API urls
const getConfigurations = (integrationId: string) => {
    return axios.get<any>('/api/intern/konfigurasjoner/', { params: { integrationId: integrationId } });
}
const getConfiguration = (configurationId: string) => {
    return axios.get<any>(`/api/intern/konfigurasjoner/${configurationId}`);
}
const createConfiguration = (integrationId: string, data: newIConfiguration) => {
    return axios.post<any>(`/api/intern/konfigurasjoner`, data);
}
const updateConfiguration = (configurationId: string, data: IConfigurationPatch) => {
    return axios.patch<any>(`/api/intern/konfigurasjoner/${configurationId}`, data);
}


const ConfigurationRepository = {
    createConfiguration,
    updateConfiguration,
    getConfigurations,
    getConfiguration
};

export default ConfigurationRepository;
