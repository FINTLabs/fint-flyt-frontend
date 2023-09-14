import axios from "axios";

const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
    return axios.get("/api/intern/metadata", {params: {kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion}})
};

const getInstanceElementMetadataById = (metadataId: string) => {
    return axios.get(`/api/intern/metadata/${metadataId}/instans-metadata`)
}

const SourceApplicationRepository = {
    getMetadata,
    getInstanceElementMetadataById
};

export default SourceApplicationRepository;
