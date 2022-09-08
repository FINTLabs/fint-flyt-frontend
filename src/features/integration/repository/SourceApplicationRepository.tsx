import axios from "axios";


const getMetadata = () => {
    return axios.get<any>("/api/intern/integrasjon/metadata", {params: {sourceApplicationId: "1"}});
};

const SourceApplicationRepository = {
    getMetadata,
};

export default SourceApplicationRepository;
