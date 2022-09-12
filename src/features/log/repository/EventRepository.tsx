import axios from "axios";
import {IIntegrationStatistics} from "../types/IntegrationStatistics";

const getEvents = () => {
    return axios.get<any>(`/api/intern/historikk/hendelser`);
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
    return axios.get<Map<string, IIntegrationStatistics>>(`/api/intern/historikk/statistikk/integrasjon`);
};

const ResourceRepository = {
    getEvents,
    getEventsByCorrelationId,
    getEventsByInstanceId,
    getEventsByIntegrationId,
    getStatistics
};

export default ResourceRepository;
