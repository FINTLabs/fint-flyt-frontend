import axios from "axios";
import {IFormData} from "../types/Form/FormData";
import {IIntegrationConfiguration} from "../types/IntegrationConfiguration";
import {IIntegration} from "../types/Integration";
import {IConfiguration} from "../types/Configuration";

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

//TODO: test with updated API urls
const createIntegration = (data: IIntegration) => {
    return axios.post<any>("/api/intern/integrasjoner", data);
}
const getIntegrations = () => {
    return axios.get<IIntegration[]>("/api/intern/integrasjoner");
}
const getIntegrationById = (integrationId: string) => {
    return axios.get<IIntegration>(`/api/intern/integrasjoner/${integrationId}`);
}
const getIntegrationState = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}
const setIntegrationState = (integrationId: string, active: boolean) => {
    return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`, active);
}
const createConfiguration = (integrationId: string, data: IConfiguration) => {
    return axios.post<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`, data);
}
const updateConfiguration = (integrationId: string, configurationId: string, data: IConfiguration) => {
    return axios.post<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner/${configurationId}`, data);
}
const getConfigurations = (integrationId: string) => {
    return axios.get<any>(`/api/intern/integrasjoner/${integrationId}/konfigurasjoner`);
}
const setActiveConfiguration = (integrationId: string, configurationId: string) => {
        return axios.put<any>(`/api/intern/integrasjoner/${integrationId}/aktiv-konfigurasjon/${configurationId}`);
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
    getIntegrationState,
    setIntegrationState,
    createConfiguration,
    updateConfiguration,
    getConfigurations,
    setActiveConfiguration
};

export default IntegrationRepository;
