import axios from "axios";

const getEvents = (correlationId?: string, instanceId?: string, integrationId?: string, onlyLastest?: boolean) => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            correlationId: correlationId,
            instanceId: instanceId,
            integrationId: integrationId,
            onlyLatest: onlyLastest
        }});
};

const getStatistics = () => {
    return axios.get<any>(`/api/intern/historikk/integrasjoner/statistikk`);
};

const ResourceRepository = {
    getEvents,
    getStatistics
};

export default ResourceRepository;
