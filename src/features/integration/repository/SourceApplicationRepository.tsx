import axios from "axios";
import {IIntegrationMetadata} from "../types/IntegrationMetadata";

//TODO: 08/09-22 support for more sourceApplicationIds
const getMetadata = () => {
    return axios.get<Map<string, IIntegrationMetadata>>("/api/intern/integrasjon/metadata", {params: {sourceApplicationId: "1"}});
};

const SourceApplicationRepository = {
    getMetadata,
};

export default SourceApplicationRepository;
