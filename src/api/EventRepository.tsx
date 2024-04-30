import axios from "axios";

const getEvents = (
    page: number,
    size: number,
    sortProperty: string,
    sortDirection: string
) => {
    return axios.get(`/api/intern/historikk/hendelser`, {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            bareSistePerInstans: false,
        },
    });
};

const getLatestEvents = (
    page: number,
    size: number,
    sortProperty: string,
    sortDirection: string
) => {
    return axios.get(`/api/intern/historikk/hendelser`, {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            bareSistePerInstans: true,
        },
    });
};

const getEventsByInstanceId = (
    page: number,
    size: number,
    sortProperty: string,
    sortDirection: string,
    kildeapplikasjonId?: string,
    kildeapplikasjonInstansId?: string
) => {
    return axios.get(`/api/intern/historikk/hendelser`, {
        params: {
            side: page,
            antall: size,
            sorteringFelt: sortProperty,
            sorteringRetning: sortDirection,
            kildeapplikasjonId: kildeapplikasjonId,
            kildeapplikasjonInstansId: kildeapplikasjonInstansId,
        },
    });
};

const manualDispatchEvent = (sourceApplicationInstanceId: string, sourceApplicationId: string, archiveInstanceId: string, sourceApplicationIntegrationId: string) => {
    return axios.post(`/api/intern/historikk/handlinger/instanser/sett-status/manuelt-behandlet-ok`, {archiveInstanceId, sourceApplicationId, sourceApplicationInstanceId, sourceApplicationIntegrationId}
    );
};
const manualRejectEvent = (sourceApplicationInstanceId: string, sourceApplicationId: string, sourceApplicationIntegrationId: string) => {
    return axios.post(`/api/intern/historikk/handlinger/instanser/sett-status/manuelt-avvist`, {sourceApplicationId, sourceApplicationInstanceId, sourceApplicationIntegrationId});
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
    getStatistics,
    manualRejectEvent,
    manualDispatchEvent
};

export default EventRepository;
