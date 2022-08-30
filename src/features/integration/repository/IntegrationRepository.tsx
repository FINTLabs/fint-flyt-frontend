import axios from "axios";
import IFormData from "../types/Form/FormData";
import {IIntegrationConfiguration} from "../types/IntegrationConfiguration";

const getLatest = () => {
    return axios.get<Array<IFormData>>("/api/intern/integrasjon/konfigurasjon");
};

const getLatestByID = (id: any) => {
    return axios.get<Array<IFormData>>(`/api/intern/integrasjon/konfigurasjon/${id}/latest`);
}

const get = () => {
    return axios.get<any>(`/api/intern/integrasjon/konfigurasjon/`);
};

const getByIdAndVersion = (id: any, version: any) => {
    return axios.get<any>(`/api/intern/integrasjon/konfigurasjon/${id}/${version}`);
};

const create = (data: IIntegrationConfiguration) => {
    return axios.post<any>("/api/intern/integrasjon/konfigurasjon", data);
};

const update = (id: any, data: IIntegrationConfiguration) => {
    return axios.put<any>(`/api/intern/integrasjon/konfigurasjon/${id}`, data);
};

const remove = (id: any) => {
    return axios.delete<any>(`/api/intern/integrasjon/konfigurasjon/${id}`);
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
