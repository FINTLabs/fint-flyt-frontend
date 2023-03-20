import axios from "axios";
import {IConfiguration, IConfigurationPatch} from "../../features/configuration/types/Configuration";

//TODO: test with updated API urls
const getConfigurations = (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, integrationId: string, excludeElements?: boolean) => {
    return axios.get<any>('/api/intern/konfigurasjoner/', {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            ferdigstilt: complete,
            integrasjonId: integrationId,
            ekskluderMapping: excludeElements
        }
    });
}
const getConfiguration = (configurationId: string, excludeElements?: boolean) => {
    return axios.get<any>(`/api/intern/konfigurasjoner/${configurationId}`, {params: {ekskluderMapping: excludeElements}});
}
const createConfiguration = (data: IConfiguration) => {
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
