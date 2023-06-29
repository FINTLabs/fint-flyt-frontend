import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import InstanceTable from "./components/InstanceTable";
import InstancePanel from "./components/InstancePanel";
import {InstanceStyles} from "../../util/styles/Instance.styles";

const useStyles = InstanceStyles;

type Props = {
    id: string
}
const InstanceOverview: React.FunctionComponent<RouteComponentProps<Props>> = () => {
    const classes = useStyles();
    const showPanel = !(/list/.test(window.location.pathname))

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

export default InstanceOverview;
