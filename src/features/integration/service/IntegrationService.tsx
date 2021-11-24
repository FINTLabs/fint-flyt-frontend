import http from "../../../http-common";
import IFormData from "../types/Form/FormData";

const getLatest = () => {
    return http.get<Array<IFormData>>("/integration/configuration");
};

const getLatestByID = (id: any) => {
    return http.get<Array<IFormData>>(`/integration/configuration/${id}/latest`);
}

const get = () => {
    return http.get<IFormData>(`/integration/configuration/`);
};

const getByIdAndVersion = (id: any, version: any) => {
    return http.get<IFormData>(`/integration/configuration/${id}/${version}`);
};

const create = (data: any) => {
    return http.post<any>("/integration/configuration", data);
};

const update = (id: any, data: any) => {
    return http.put<any>(`/integration/configuration/${id}`, data);
};

const remove = (id: any) => {
    return http.delete<any>(`/integration/configuration/${id}`);
};

const IntegrationService = {
    getByIdAndVersion,
    get,
    getLatest,
    getLatestByID,
    create,
    update,
    remove
};

export default IntegrationService;