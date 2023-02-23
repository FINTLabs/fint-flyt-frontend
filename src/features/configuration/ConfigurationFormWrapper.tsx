import React, {useContext} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import CaseConfigForm from "./CaseConfigForm";

const ConfigurationFormWrapper: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication} = useContext(SourceApplicationContext)

    return (
            <CaseConfigForm/>
    );
}

export default withRouter(ConfigurationFormWrapper);