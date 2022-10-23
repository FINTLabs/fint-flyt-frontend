import axios from "axios";

const getEvents = (page: number, size: number, sortProperty: string, sortDirection: string) => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            bareSistePerInstans: false
        }
    });
};

const getLatestEvents = (page: number, size: number, sortProperty: string, sortDirection: string) => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            bareSistePerInstans: true
        }
    });
};

const getEventsByInstanceId = (page: number, size: number, sortProperty: string, sortDirection: string, kildeapplikasjonId?: string, kildeapplikasjonInstansId?: string) => {
    return axios.get<any>(`/api/intern/historikk/hendelser`, {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            kildeapplikasjonId: kildeapplikasjonId,
            kildeapplikasjonInstansId: kildeapplikasjonInstansId
        }
    });
};

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
