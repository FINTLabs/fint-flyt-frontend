import axios from "axios";

const getClasses = (link: string) => {
    return axios.get<any>(`api/intern/arkiv/kodeverk/klasse/`, {params: {klassifikasjonssystemLink: link}});
};

const getResource = (resource: string) => {
    return axios.get<any>(`api/intern/arkiv/kodeverk/${resource}`);
}

const getSak = (caseYear: any, caseNumber: any) => {
    return axios.get<any>(`api/intern/arkiv/saker/${caseYear}/${caseNumber}/tittel`, {timeout: 10000})
}
const ResourceRepository = {
    getClasses,
    getResource,
    getSak
};

export default ResourceRepository;
