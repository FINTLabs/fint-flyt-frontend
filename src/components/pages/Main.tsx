import React, {useContext, useEffect} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {AuthorizationContext} from "../../context/AuthorizationContext";

function Main() {
    const {sourceApplications, getSourceApplications} = useContext(SourceApplicationContext)
    const {authorized, getAuthorization} = useContext(AuthorizationContext)

    useEffect(() => {
        getSourceApplications();
        getAuthorization()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
            <AppBar/>
            {sourceApplications && authorized ? <main>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main> : <h1>unathorized</h1>
            }
        </Box>
    );
}

export default Main;
