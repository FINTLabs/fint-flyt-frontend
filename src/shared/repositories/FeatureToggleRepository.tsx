import axios from "axios";

// TODO: correct url?
const getFeatures = () => { return axios.get(`/api/feature`) }

const FeatureToggleRepository = {
    getFeatures
};

export default FeatureToggleRepository;
