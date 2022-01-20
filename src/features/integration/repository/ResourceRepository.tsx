import axios from "axios";

const getAdministrativeUnits = () => {
    return axios.get<any>("/kodeverk/administrativenhet");
};

const getClassificationSystems = () => {
    return axios.get<any>("/kodeverk/klassifikasjonssystem");
};

const getStatuses = () => {
    return axios.get<any>("/kodeverk/sakstatus");
};

const getArchiveSections = () => {
    return axios.get<any>("/kodeverk/arkivdel");
};

const getAccessCodes = () => {
    return axios.get<any>("/kodeverk/tilgangsrestriksjon");
};

const getClassificationTypes = () => {
    return axios.get<any>("/kodeverk/klassifikasjonstype");
};

const getParagraphs = () => {
    return axios.get<any>("/kodeverk/skjermingshjemmel");
};

const getDocumentStatuses = () => {
    return axios.get<any>("/kodeverk/dokumentstatus");
};

const getDocumentTypes = () => {
    return axios.get<any>("/kodeverk/dokumenttype");
};

const ResourceRepository = {
    getAdministrativeUnits,
    getClassificationSystems,
    getStatuses,
    getArchiveSections,
    getAccessCodes,
    getParagraphs,
    getClassificationTypes,
    getDocumentStatuses,
    getDocumentTypes
};

export default ResourceRepository;