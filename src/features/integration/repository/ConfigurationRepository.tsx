import axios from "axios";
import {newIConfiguration} from "../types/Configuration";

//TODO: test with updated API urls
const getConfigurations = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}
const createConfiguration = (integrationId: string, data: newIConfiguration) => {
    return axios.post<any>(`/api/intern/konfigurasjoner`, data);
}
const updateConfiguration = (configurationId: string, data: newIConfiguration) => {
    return axios.put<any>(`/api/intern/konfigurasjoner/${configurationId}`, data);
}
const deleteConfiguration = (configurationId: string) => {
    return axios.delete<any>(`/api/intern/integrasjoner/${configurationId}`);
}

const ConfigurationRepository = {
    createConfiguration,
    updateConfiguration,
    getConfigurations,
    deleteConfiguration
};

export default ConfigurationRepository;
