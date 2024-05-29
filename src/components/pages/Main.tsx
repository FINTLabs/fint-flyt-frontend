import React, {useContext, useEffect} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {AuthorizationContext} from "../../context/AuthorizationContext";

function Main() {
    const {activeUserSourceApps, getUser, isAdmin, getActiveUserSourceApps} = useContext(AuthorizationContext)
    const {authorized, getAuthorization} = useContext(AuthorizationContext)

    useEffect(() => {
        getUser();
        getAuthorization();
        getActiveUserSourceApps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
            {isAdmin !== undefined && <AppBar/>}
            {authorized !== undefined && isAdmin !== undefined && activeUserSourceApps !== undefined && <main>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
            }
        </Box>
    );
}

export default Main;
