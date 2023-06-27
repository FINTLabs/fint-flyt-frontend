import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import InstanceTable from "./components/InstanceTable";
import InstancePanel from "./components/InstancePanel";
import {InstanceStyles} from "../../util/styles/Instance.styles";

const useStyles = InstanceStyles;

const InstanceOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const showPanel: boolean = !(/list/.test(window.location.pathname))

    return (
        <>
            {showPanel ?
                <InstancePanel
                    classes={classes}
                /> :
                <InstanceTable
                    classes={classes}
                />}
        </>
    );
}

export default withRouter(InstanceOverview);
