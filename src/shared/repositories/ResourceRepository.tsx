import axios from "axios";

const getClasses = (link: string) => {
    return axios.get<any>(`/api/intern/arkiv/kodeverk/klasse/`, {params: {klassifikasjonssystemLink: link}});
};

const getResource = (resource: string) => {
    return axios.get<any>(`/api/intern/arkiv/kodeverk/${resource}`);
}

const getCodeworkResource = (url: string) => {
    console.log('getCodeworkResource')
    return axios.get<any>(url);
}

const getSak = (caseYear: any, id: any) => {
    return axios.get<any>(`/api/intern/arkiv/saker/${caseYear}/${id}/tittel`, {timeout: 10000})
}
const ResourceRepository = {
    getClasses,
    getResource,
    getCodeworkResource,
    getSak
};

export default ResourceRepository;
