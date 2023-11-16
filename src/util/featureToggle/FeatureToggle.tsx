import React, {ReactNode} from "react";
import useFeatureEnabled from "./useFeatureEnabled";

interface FeatureToggleProps {
    feature: string;
    children: ReactNode;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ feature, children }) => {
    const featureEnabled = useFeatureEnabled(feature);

    if (featureEnabled) {
        return <>{children}</>;
    }
    return <React.Fragment />;
};

export default FeatureToggle;
