import axios from "axios";

const getEvents = (kildeapplikasjonId?: string, kildeapplikasjonInstansId?: string) => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            kildeapplikasjonsId: kildeapplikasjonId,
            kildeapplikasjonInstansId: kildeapplikasjonInstansId
        }
    });
};

const getLatestEvents = () => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            bareSistePerInstans: true
        }
    });
};

const getEventsByCorrelationId = (id: any) => {
    return axios.get<any>(`/api/intern/historikk/korrelasjonsid/${id}`);
};

const getEventsByInstanceId = (id: any) => {
    return axios.get<any>(`/api/intern/historikk/instansid/${id}`);
};

const getEventsByIntegrationId = (id: any) => {
    return axios.get<any>(`/api/intern/historikk/integrasjonsid/${id}`);
};

const getStatistics = () => {
    return axios.get<any>(`/api/intern/historikk/statistikk/integrasjoner`);
};

const ResourceRepository = {
    getEvents,
    getEventsByCorrelationId,
    getEventsByInstanceId,
    getEventsByIntegrationId,
    getStatistics
};

export default ResourceRepository;
