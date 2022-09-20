import axios from "axios";
import {IIntegration} from "../types/Integration";

//TODO: test with updated API urls
const createIntegration = (data: IIntegration) => {
    return axios.post<any>("/api/intern/integrasjoner", data);
}
const getIntegrations = () => {
    return axios.get<IIntegration[]>("/api/intern/integrasjoner");
}
const getIntegrationById = (integrationId: string) => {
    return axios.get<IIntegration>(`/api/intern/integrasjoner/${integrationId}`);
}
const getIntegrationState = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}
const setIntegrationState = (integrationId: string, active: boolean) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`, active);
}

const IntegrationRepository = {
    createIntegration,
    getIntegrations,
    getIntegrationById,
    getIntegrationState,
    setIntegrationState
};

export default IntegrationRepository;
