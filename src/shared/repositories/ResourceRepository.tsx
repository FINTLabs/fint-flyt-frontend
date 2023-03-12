import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ISelectable} from "../../features/configuration/types/Selectable";

const getClasses = (link: string) => {
    return axios.get<any>(`/api/intern/arkiv/kodeverk/klasse/`, {params: {klassifikasjonssystemLink: link}});
};

const getResource = (resource: string) => {
    return axios.get<any>(`/api/intern/arkiv/kodeverk/${resource}`);
}

const getSelectables = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ISelectable[]>> => {
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
