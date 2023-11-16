import React, {ReactNode} from "react";
import {useFlag} from "@unleash/proxy-client-react";

interface FeatureToggleProps {
    feature: string;
    children: ReactNode;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({feature, children}) => {
    if (useFlag(feature)) {
        return <>{children}</>;
    }
    return <React.Fragment/>;
};

export default FeatureToggle;
