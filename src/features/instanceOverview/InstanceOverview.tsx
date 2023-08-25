import React from 'react';
import InstanceTable from "./components/InstanceTable";
import InstancePanel from "./components/InstancePanel";
import {InstanceStyles} from "../../util/styles/Instance.styles";
import {RouteComponent} from "../main/Route";

const useStyles = InstanceStyles;

const InstanceOverview: RouteComponent = () => {
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
