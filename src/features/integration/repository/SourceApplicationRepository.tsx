import axios from "axios";


const getMetadata = () => {
    return axios.get<Array<any>>("/api/intern/integrasjon/metadata");
};

const SourceApplicationRepository = {
    getLatest: getMetadata,
};

export default SourceApplicationRepository;
