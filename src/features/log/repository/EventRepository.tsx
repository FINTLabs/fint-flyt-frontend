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

const getEventsByInstanceId = (kildeapplikasjonId?: string, kildeapplikasjonInstansId?: string) => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            kildeapplikasjonId: kildeapplikasjonId,
            kildeapplikasjonInstansId: kildeapplikasjonInstansId
        }
    });};
const getAllStatistics = () => {
    return axios.get<any>(`/api/intern/historikk/statistikk`);
};

const getStatistics = () => {
    return axios.get<any>(`/api/intern/historikk/statistikk/integrasjoner`);
};

const ResourceRepository = {
    getEvents,
    getLatestEvents,
    getEventsByInstanceId,
    getAllStatistics,
    getStatistics
};

export default ResourceRepository;
