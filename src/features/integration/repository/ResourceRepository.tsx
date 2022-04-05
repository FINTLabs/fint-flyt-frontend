import axios from "axios";

const getAdministrativeUnits = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/administrativenhet");
};

const getStatuses = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/sakstatus");
};

const getArchiveSections = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/arkivdel");
};

const getArchiveResources = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/arkivressurs");
};

const getClassificationSystems = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/klassifikasjonssystem");
};

const getClasses = (link: string) => {
    let encodedLink = encodeURIComponent(link);
    return axios.get<any>(`http://localhost:8081/api/kodeverk/klasse/${encodedLink}`);
};

const getAccessCodes = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/tilgangsrestriksjon");
};

const getParagraphs = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/skjermingshjemmel");
};

const getRecordStatuses = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/journalstatus");
};

const getVariants = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/variantformat");
};

const getDocumentStatuses = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/dokumentstatus");
};

const getDocumentTypes = () => {
    return axios.get<any>("http://localhost:8081/api/kodeverk/dokumenttype");
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
