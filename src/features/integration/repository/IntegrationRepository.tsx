import axios from "axios";
import IFormData from "../types/Form/FormData";
import {IIntegrationConfiguration} from "../types/IntegrationConfiguration";

const getLatest = () => {
    return axios.get<Array<IFormData>>("/api/integration/configuration");
};

const getLatestByID = (id: any) => {
    return axios.get<Array<IFormData>>(`/api/integration/configuration/${id}/latest`);
}

const get = () => {
    return axios.get<any>(`/api/integration/configuration/`);
};

const getByIdAndVersion = (id: any, version: any) => {
    return axios.get<any>(`/api/integration/configuration/${id}/${version}`);
};

const create = (data: IIntegrationConfiguration) => {
    return axios.post<any>("/api/integration/configuration", data);
};

const update = (id: any, data: IIntegrationConfiguration) => {
    return axios.put<any>(`/api/integration/configuration/${id}`, data);
};

const remove = (id: any) => {
    return axios.delete<any>(`/api/integration/configuration/${id}`);
};

const getSak = (caseYear: any, caseNumber: any) => {
    return axios.get<any>(`/api/intern/sakstittel/mappeid/${caseYear}/${caseNumber}`, {timeout: 5000})
}

const IntegrationRepository = {
    getByIdAndVersion,
    get,
    getLatest,
    getLatestByID,
    create,
    update,
    remove,
    getSak
};

export default IntegrationRepository;
