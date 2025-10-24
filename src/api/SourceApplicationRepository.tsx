import apiAdapter from "./apiAdapter";
import {ISourceApplication} from "../features/configuration/types/SourceApplication";
import {
    IInstanceMetadataContent,
    IIntegrationMetadata,
} from '../features/configuration/types/Metadata/IntegrationMetadata';

const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
    return apiAdapter.get<IIntegrationMetadata[]>("/api/intern/metadata", {params: {kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion}})
};

const getInstanceElementMetadataById = (metadataId: string) => {
    return apiAdapter.get<IInstanceMetadataContent>(`/api/intern/metadata/${metadataId}/instans-metadata`)
}

export const getSourceApplications = (): ISourceApplication[] => {
    return [
        {id: 1, displayName: "ACOS Interact", available: true},
        {id: 2, displayName: "eGrunnerverv", available: true},
        {id: 3, displayName: "Digisak", available: true},
        {id: 4, displayName: "VIGO", available: true},
        {id: 5, displayName: "Altinn", available: true},
        {id: 6, displayName: "HMSReg", available: true}
    ]
}

const SourceApplicationRepository = {
    getMetadata,
    getInstanceElementMetadataById,
    getSourceApplications
};

export default SourceApplicationRepository;
