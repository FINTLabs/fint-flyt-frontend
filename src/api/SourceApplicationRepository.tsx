import axios from "axios";

const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
    return axios.get("/api/intern/metadata", {params: {kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion}})
};

const getInstanceElementMetadataById = (metadataId: string) => {
    return axios.get(`/api/intern/metadata/${metadataId}/instans-metadata`)
}

const getSourceApplications = () => {
    //return axios.get("/api/intern/kildeapplikasjoner")
    return [
        {id: 1, displayName: "ACOS Interact", available: true},
        {id: 2, displayName: "eGrunnerverv", available: true},
        {id: 3, displayName: "Digisak", available: true}
    ]
}

const SourceApplicationRepository = {
    getMetadata,
    getInstanceElementMetadataById,
    getSourceApplications
};

export default SourceApplicationRepository;
