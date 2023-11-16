import {useContext} from "react";
import {ApplicationContext} from "../../context/ApplicationContext";

const useFeatureEnabled = (feature: string): boolean => {
    const {features} = useContext(ApplicationContext)
    return features[feature];
};

export default useFeatureEnabled;
