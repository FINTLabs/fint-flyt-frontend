import React, {useContext} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import Panel from "./components/Panel";

const ConfigurationFormWrapper: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication} = useContext(SourceApplicationContext)

    return (
        <Panel/>
    );
}

export default withRouter(ConfigurationFormWrapper);