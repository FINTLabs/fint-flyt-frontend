import React, { useContext, useEffect } from "react";
import IntegrationTable from "./components/IntegrationTable";
import { IntegrationContext } from "../../context/IntegrationContext";
import IntegrationPanel from "./components/IntegrationPanel";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {IntegrationStyles} from "../../util/styles/Integration.styles";
import {RouteComponent} from "../main/Route";
import PageTemplate from "../../components/templates/PageTemplate";
import { SourceApplicationContext } from "../../context/SourceApplicationContext";
import { IntegrationStyles } from "../../util/styles/Integration.styles";
import { RouteComponent } from "../../routes/Route";
import InformationTemplate from "../../components/templates/InformationTemplate";

const useStyles = IntegrationStyles;

const IntegrationOverview: RouteComponent = () => {
    const classes = useStyles();
    const {
        existingIntegration,
        getAllIntegrations,
        resetIntegrations
    } = useContext(IntegrationContext)
    const {getAllMetadata} = useContext(SourceApplicationContext)
    const showPanel: boolean = /panel$/.test(window.location.pathname)
    const showList: boolean = /list$/.test(window.location.pathname)


    useEffect(() => {
        if (showList) {
            resetIntegrations();
        }
        getAllIntegrations();
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <PageTemplate id={'integration'} keyPrefix={'pages.integrationOverview'} wide>
            {existingIntegration?.sourceApplicationIntegrationId && showPanel ?
                <IntegrationPanel
                    classes={classes}
                /> :
                <IntegrationTable
                    classes={classes}
                />
            }
        </PageTemplate>
    );
}

export default IntegrationOverview;
