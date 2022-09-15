import axios from "axios";

const getMetadata = (id: string) => {
    return axios.get<any>("/api/intern/integrasjoner/metadata", {params: {sourceApplicationId: id}})
};

const SourceApplicationRepository = {
    getMetadata,
};

export default SourceApplicationRepository;
