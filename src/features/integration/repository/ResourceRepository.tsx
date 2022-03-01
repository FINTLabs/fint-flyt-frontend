import axios from "axios";

const getAdministrativeUnits = () => {
    return axios.get<any>("/kodeverk/administrativenhet");
};

const getStatuses = () => {
    return axios.get<any>("/kodeverk/sakstatus");
};

const getArchiveSections = () => {
    return axios.get<any>("/kodeverk/arkivdel");
};

const getArchiveResources = () => {
    return axios.get<any>("/kodeverk/arkivressurs");
};

const getClassificationSystems = () => {
    return axios.get<any>("/kodeverk/klassifikasjonssystem");
};

const getClasses = (link: string) => {
    let encodedLink = encodeURIComponent(link);
    return axios.get<any>(`/kodeverk/klasse/${encodedLink}`);
};

const getAccessCodes = () => {
    return axios.get<any>("/kodeverk/tilgangsrestriksjon");
};

const getParagraphs = () => {
    return axios.get<any>("/kodeverk/skjermingshjemmel");
};

const getRecordStatuses = () => {
    return axios.get<any>("/kodeverk/journalstatus");
};

const getVariants = () => {
    return axios.get<any>("/kodeverk/variantformat");
};

const getDocumentStatuses = () => {
    return axios.get<any>("/kodeverk/dokumentstatus");
};

const getDocumentTypes = () => {
    return axios.get<any>("/kodeverk/dokumenttype");
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
    getDocumentStatuses,
    getVariants
};

export default ResourceRepository;