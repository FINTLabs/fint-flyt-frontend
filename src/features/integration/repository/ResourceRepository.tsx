import axios from "axios";

const getAdministrativeUnits = () => {
    return axios.get<any>("/api/intern/kodeverk/administrativenhet");
};

const getStatuses = () => {
    return axios.get<any>("/api/intern/kodeverk/sakstatus");
};

const getArchiveSections = () => {
    return axios.get<any>("/api/intern/kodeverk/arkivdel");
};

const getArchiveResources = () => {
    return axios.get<any>("/api/intern/kodeverk/arkivressurs");
};

const getClassificationSystems = () => {
    return axios.get<any>("/api/intern/kodeverk/klassifikasjonssystem");
};

const getClasses = (link: string) => {
    return axios.get<any>(`/api/intern/kodeverk/klasse/`, {params: {klassifikasjonssystemLink: link}});
};

const getAccessCodes = () => {
    return axios.get<any>("/api/intern/kodeverk/tilgangsrestriksjon");
};

const getParagraphs = () => {
    return axios.get<any>("/api/intern/kodeverk/skjermingshjemmel");
};

const getRecordStatuses = () => {
    return axios.get<any>("/api/intern/kodeverk/journalstatus");
};

const getRecordTypes = () => {
    return axios.get<any>("/api/intern/kodeverk/journalposttype");
};

const getVariants = () => {
    return axios.get<any>("/api/intern/kodeverk/variantformat");
};

const getDocumentStatuses = () => {
    return axios.get<any>("/api/intern/kodeverk/dokumentstatus");
};

const getDocumentTypes = () => {
    return axios.get<any>("/api/intern/kodeverk/dokumenttype");
};

const ResourceRepository = {
    getAdministrativeUnits,
    getAccessCodes,
    getParagraphs,
    getStatuses,
    getArchiveSections,
    getArchiveResources,
    getClassificationSystems,
    getClasses,
    getDocumentTypes,
    getRecordStatuses,
    getRecordTypes,
    getDocumentStatuses,
    getVariants
};

export default ResourceRepository;
