import axios from "axios";
import IFormData from "../types/Form/FormData";

const getLatest = () => {
    return axios.get<Array<IFormData>>("/integration/configuration");
};

const getLatestByID = (id: any) => {
    return axios.get<Array<IFormData>>(`/integration/configuration/${id}/latest`);
}

const get = () => {
    return axios.get<IFormData>(`/integration/configuration/`);
};

const getByIdAndVersion = (id: any, version: any) => {
    return axios.get<IFormData>(`/integration/configuration/${id}/${version}`);
};

const create = (data: any) => {
    return axios.post<any>("/integration/configuration", data);
};

const update = (id: any, data: any) => {
    return axios.put<any>(`/integration/configuration/${id}`, data);
};

const remove = (id: any) => {
    return axios.delete<any>(`/integration/configuration/${id}`);
};

const IntegrationRepository = {
    getByIdAndVersion,
    get,
    getLatest,
    getLatestByID,
    create,
    update,
    remove
};

export default IntegrationRepository;