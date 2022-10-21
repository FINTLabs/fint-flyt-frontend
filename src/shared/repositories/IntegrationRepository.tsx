import axios from "axios";
import {IIntegration, IIntegrationPatch} from "../../features/integration/types/Integration";

const getIntegrations = (integrationId?: string) => {
    return axios.get<IIntegration[]>("/api/intern/integrasjoner", {params: {integrationId: integrationId}});
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
