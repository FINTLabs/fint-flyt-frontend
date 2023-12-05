import React from 'react';
import InstanceTable from "./components/InstanceTable";
import InstancePanel from "./components/InstancePanel";
import {InstanceStyles} from "../../util/styles/Instance.styles";
import {RouteComponent} from "../main/Route";
import InformationTemplate from "../../components/templates/InformationTemplate";

const useStyles = InstanceStyles;

const InstanceOverview: RouteComponent = () => {
    const classes = useStyles();
    const showPanel = !(/list/.test(window.location.pathname))

    return (
        <InformationTemplate id={'instance'} keyPrefix={'pages.instanceOverview'} wide>
            {showPanel ?
                <InstancePanel
                    classes={classes}
                /> :
                <InstanceTable
                    classes={classes}
                />}
        </InformationTemplate>
    );
}

export default InstanceOverview;
