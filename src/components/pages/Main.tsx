import React, {useContext, useEffect} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {AuthorizationContext} from "../../context/AuthorizationContext";

function Main() {
    const {sourceApplications, getSourceApplications} = useContext(SourceApplicationContext)
    const {getUser, isAdmin} = useContext(AuthorizationContext)
    const {authorized, getAuthorization} = useContext(AuthorizationContext)

    useEffect(() => {
        getUser();
        getAuthorization();
        getSourceApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
            {isAdmin !== undefined && <AppBar/>}
            {sourceApplications && authorized !== undefined && isAdmin !== undefined && <main>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
            }
        </Box>
    );
}

export default Main;
