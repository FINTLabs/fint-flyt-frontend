import axios from "axios";
import IFormData from "../types/Form/FormData";
import {IIntegrationConfiguration} from "../types/IntegrationConfiguration";
//TODO: remove old urls
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
    return axios.get<any>(`/api/intern/arkiv/saker/${caseYear}/${caseNumber}/tittel`, {timeout: 5000})
}

//TODO: change any to IIntegration
const getIntegrations = () => {
    return axios.get<any[]>("/api/intern/integrasjoner");
}
const getIntegrationById = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}`);
}
const createIntegration = (data: any) => {
    return axios.post<any>("/api/intern/integrasjoner", data);
}
const setIntegrationState = (integrationId: string) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}
const setActiveConfiguration = (integrationId: string, configurationId: string) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/aktiv-konfigurasjon/${configurationId}`);
}
const getConfigurations = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}
//TODO: change any to IConfiguration
const createConfiguration = (integrationId: string, data: any) => {
    return axios.post<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`, data);
}
const updateConfiguration = (integrationId: string, configurationId: string, data: any) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner/${configurationId}`, data);
}

const IntegrationRepository = {
    getByIdAndVersion,
    get,
    getLatest,
    getLatestByID,
    create,
    update,
    remove,
    getSak,
    createIntegration,
    getIntegrations,
    getIntegrationById,
    setIntegrationState,
    createConfiguration,
    getConfigurations,
    setActiveConfiguration,
    updateConfiguration
};

export default IntegrationRepository;
