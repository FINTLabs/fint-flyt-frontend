import axios from "axios";
import {IIntegrationMetadata} from "../types/IntegrationMetadata";

const getMetadata = (id: string) => {
    return axios.get<Map<string, IIntegrationMetadata>>("/api/intern/integrasjon/metadata", {params: {sourceApplicationId: id}});
};

const SourceApplicationRepository = {
    getMetadata,
};

export default SourceApplicationRepository;
