import axios from "axios";

const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
    return axios.get<any>("api/intern/metadata", {params: {kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion}})
};

const getInstanceElementMetadata = (metadataId: string) => {
    return axios.get<any>(`api/intern/metadata/${metadataId}/instans-element-metadata`)
}

const SourceApplicationRepository = {
    getMetadata,
    getInstanceElementMetadata
};

export default SourceApplicationRepository;