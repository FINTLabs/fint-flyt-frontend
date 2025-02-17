import axios from 'axios';

const getEvents = (page: number, size: number, sortProperty: string, sortDirection: string) => {
    return axios.get(`/api/intern/instance-flow-tracking/summaries`, {
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
    return axios.get(`/api/intern/instance-flow-tracking/summaries`, {
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
    return axios.get(`/api/intern/instance-flow-tracking/summaries`, {
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

const manualDispatchEvent = (
    sourceApplicationInstanceId: string,
    sourceApplicationId: string,
    archiveInstanceId: string,
    sourceApplicationIntegrationId: string
) => {
    return axios.post(`/api/intern/instance-flow-tracking/events/instance-manually-processed`, {
        archiveInstanceId,
        sourceApplicationId,
        sourceApplicationInstanceId,
        sourceApplicationIntegrationId,
    });
};
const manualRejectEvent = (
    sourceApplicationInstanceId: string,
    sourceApplicationId: string,
    sourceApplicationIntegrationId: string
) => {
    return axios.post(`/api/intern/instance-flow-tracking/events/instance-manually-rejected`, {
        sourceApplicationId,
        sourceApplicationInstanceId,
        sourceApplicationIntegrationId,
    });
};

const getAllStatistics = () => {
    return axios.get(`/api/intern/instance-flow-tracking/statistikk`);
};

const getStatistics = () => {
    return axios.get(`/api/intern/instance-flow-tracking/statistics/integrations`);
};

const EventRepository = {
    getEvents,
    getLatestEvents,
    getEventsByInstanceId,
    getAllStatistics,
    getStatistics,
    manualRejectEvent,
    manualDispatchEvent,
};

export default EventRepository;
