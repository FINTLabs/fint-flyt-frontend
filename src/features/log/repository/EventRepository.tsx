import axios from "axios";

const getEvents = () => {
    return axios.get<any>(`/api/sakshistorikk/hendelser`);
};

const getEventsByCorrelationId = (id: any) => {
    return axios.get<any>(`/api/sakshistorikk/korrelasjonsid/${id}`);
};

const getEventsByInstanceId = (id: any) => {
    return axios.get<any>(`/api/sakshistorikk/instansid/${id}`);
};

const getEventsByIntegrationId = (id: any) => {
    return axios.get<any>(`/api/sakshistorikk/integrasjonsid/${id}`);
};

const ResourceRepository = {
    getEvents,
    getEventsByCorrelationId,
    getEventsByInstanceId,
    getEventsByIntegrationId
};

export default ResourceRepository;
