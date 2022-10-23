import axios from "axios";
import {IIntegration, IIntegrationPatch} from "../../features/integration/types/Integration";

const getIntegrations = (page: number, size: number, sortProperty: string, sortDirection: string) => {
    return axios.get<any>("/api/intern/integrasjoner", {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection
        }
    });
}

const getIntegration = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}`)
}
const createIntegration = (data: IIntegration) => {
    return axios.post<any>("/api/intern/integrasjoner", data);
}
const updateIntegration = (integrationId: string, data: IIntegrationPatch) => {
    return axios.patch(`/api/intern/integrasjoner/${integrationId}`, data)
}

const IntegrationRepository = {
    createIntegration,
    getIntegrations,
    updateIntegration
};

export default IntegrationRepository;
