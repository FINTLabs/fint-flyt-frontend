import React, {useContext} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import AVConfigForm from "./AVConfigForm";
import CaseConfigForm from "./CaseConfigForm";

const ConfigurationFormWrapper: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication} = useContext(SourceApplicationContext)

    return (
        sourceApplication === 1 ?
            <AVConfigForm/> :
            <CaseConfigForm/>
    );
}

export default withRouter(ConfigurationFormWrapper);