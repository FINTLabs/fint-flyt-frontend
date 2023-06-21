import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ISelectable} from "../../features/configuration/types/Selectable";
import {Source} from "../../features/configuration/util/UrlUtils";

const getClasses = (link: string) => {
    return axios.get(`/api/intern/arkiv/kodeverk/klasse/`, {params: {klassifikasjonssystemLink: link}});
};

const getResource = (resource: string) => {
    return axios.get(`/api/intern/arkiv/kodeverk/${resource}`);
}

const getSelectables = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ISelectable[]>> => {
    return axios.get<ISelectable[]>(url, config);
}

const getSak = (caseYear: number | string, id: number | string) => {
    return axios.get(`/api/intern/arkiv/saker/${caseYear}/${id}/tittel`, {timeout: 10000})
}

const search = (source: Source): Promise<{ value: string } | undefined> => {
    return axios.get<{ value: string }>('/' + source.url, source.config)
        .then<{ value: string } | undefined>((response: AxiosResponse<{ value: string } | undefined>): { value: string } | undefined => response.data)
        .catch((err) => {
            console.error(err);
            return undefined;
        })
}

const ResourceRepository = {
    getClasses,
    getResource,
    getSelectables,
    getSak,
    search
};

export default ResourceRepository;
