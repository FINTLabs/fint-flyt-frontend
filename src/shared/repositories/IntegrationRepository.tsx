import axios from "axios";
import {IIntegration} from "../../features/integration/types/Integration";

//TODO: test with updated API urls
const getIntegrations = (integrationId?: string) => {
    return axios.get<IIntegration[]>("/api/intern/integrasjoner", {params: {integrationId: integrationId}});
}
const createIntegration = (data: IIntegration) => {
    return axios.post<any>("/api/intern/integrasjoner", data);
}
const setIntegrationState = (integrationId: string) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/tilstand`);
}
const setActiveConfiguration = (integrationId: string, configurationId: string) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/aktiv-konfigurasjon-id`, {activeConfigurationId: configurationId});
}

const IntegrationRepository = {
    createIntegration,
    getIntegrations,
    setIntegrationState,
    setActiveConfiguration
};

export default IntegrationRepository;
