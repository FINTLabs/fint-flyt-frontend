import React, {useContext, useEffect} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {AuthorizationContext} from "../../context/AuthorizationContext";

function Main() {
    const {activeUserSourceApps, getUser, hasAccessToUserPermissionPage, getActiveUserSourceApps} = useContext(AuthorizationContext)
    const {authorized, getAuthorization} = useContext(AuthorizationContext)

    useEffect(() => {
        getUser();
        getAuthorization();
        getActiveUserSourceApps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
            {hasAccessToUserPermissionPage !== undefined && <AppBar/>}
            {authorized !== undefined && hasAccessToUserPermissionPage !== undefined && activeUserSourceApps !== undefined && <main>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
            }
        </Box>
    );
}

export default Main;
