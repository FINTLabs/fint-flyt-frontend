import axios from "axios";
import {IConfiguration} from "../types/Configuration";

//TODO: test with updated API urls
const createConfiguration = (integrationId: string, data: IConfiguration) => {
    return axios.post<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`, data);
}
const updateConfiguration = (configurationId: string, data: IConfiguration) => {
    return axios.put<any>(`/api/intern/konfigurasjoner/${configurationId}`, data);
}
const getConfigurations = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}

const ConfigurationRepository = {
    createConfiguration,
    updateConfiguration,
    getConfigurations
};

export default ConfigurationRepository;
