import axios from "axios";

const getEvents = (page: number, size: number, sortProperty: string, sortDirection: string) => {
    return axios.get(`/api/intern/historikk/hendelser`, {
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
    return axios.get(`/api/intern/historikk/hendelser`, {
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
    return axios.get(`/api/intern/historikk/hendelser`, {
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
    return axios.get(`/api/intern/historikk/statistikk`);
};

const getStatistics = () => {
    return axios.get(`/api/intern/historikk/statistikk/integrasjoner`);
};

const EventRepository = {
    getEvents,
    getLatestEvents,
    getEventsByInstanceId,
    getAllStatistics,
    getStatistics
};

export default EventRepository;
