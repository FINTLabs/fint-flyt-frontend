import axios from "axios";

const getEvents = () => {
    return axios.get<any>(`http://localhost:8084/api/sakshistorikk/hendelser`);
};

const getEventsByCorrelationId = (id: any) => {
    return axios.get<any>(`http://localhost:8084/api/sakshistorikk/korrelasjonsid/${id}`);
};

const getEventsByInstanceId = (id: any) => {
    return axios.get<any>(`http://localhost:8084/api/sakshistorikk/instansid/${id}`);
};

const getEventsByIntegrationId = (id: any) => {
    return axios.get<any>(`http://localhost:8084/api/sakshistorikk/integrasjonsid/${id}`);
};

const ResourceRepository = {
    getEvents,
    getEventsByCorrelationId,
    getEventsByInstanceId,
    getEventsByIntegrationId
};

export default ResourceRepository;
