import axios, {AxiosRequestConfig} from "axios";
import {ISelectable} from "../../features/configuration/components/FormPanel";

const getClasses = (link: string) => {
    return axios.get<any>(`/api/intern/arkiv/kodeverk/klasse/`, {params: {klassifikasjonssystemLink: link}});
};

const getResource = (resource: string) => {
    return axios.get<any>(`/api/intern/arkiv/kodeverk/${resource}`);
}

const getSelectables = (url: string, config?: AxiosRequestConfig) => {
    return axios.get<ISelectable[]>(url, config);
}

const getSak = (caseYear: any, id: any) => {
    return axios.get<any>(`/api/intern/arkiv/saker/${caseYear}/${id}/tittel`, {timeout: 10000})
}
const ResourceRepository = {
    getClasses,
    getResource,
    getSelectables,
    getSak
};

export default ResourceRepository;
