import axios from "axios";
import {ISourceApplication} from "../features/configuration/types/SourceApplication";

const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
    return axios.get("/api/intern/metadata", {params: {kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion}})
};

const getInstanceElementMetadataById = (metadataId: string) => {
    return axios.get(`/api/intern/metadata/${metadataId}/instans-metadata`)
}

const getSourceApplications = (): ISourceApplication[] => {
    //return axios.get("/api/intern/sourceApplicationData")
    return [
        {id: 1, displayName: "ACOS Interact", available: true},
        {id: 2, displayName: "eGrunnerverv", available: true},
        {id: 3, displayName: "Digisak", available: true},
        {id: 4, displayName: "VIGO", available: true}

    ]
}

const SourceApplicationRepository = {
    getMetadata,
    getInstanceElementMetadataById,
    getSourceApplications
};

export default SourceApplicationRepository;
