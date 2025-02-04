import React, {useContext, useEffect} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Page} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import Footer from "../templates/Footer";

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
//style={{width:"2400px"}}
        <Page footer={<Footer />} >
            {hasAccessToUserPermissionPage !== undefined && <AppBar/>}


            <Page.Block as="main"
                        style={{
                // flexGrow: 1, // Allow this section to grow and fill the available space
                // overflow: "auto", // Allow scrolling if content exceeds viewport
            }}
            >
                {authorized !== undefined && hasAccessToUserPermissionPage !== undefined && activeUserSourceApps !== undefined &&
                           <ConfigurationProvider>
                               <Router/>
                          </ConfigurationProvider>

                }
            </Page.Block>

        </Page>

        // <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
        //     {hasAccessToUserPermissionPage !== undefined && <AppBar/>}
        //     {authorized !== undefined && hasAccessToUserPermissionPage !== undefined && activeUserSourceApps !== undefined && <main>
        //         <ConfigurationProvider>
        //             <Router/>
        //         </ConfigurationProvider>
        //     </main>
        //     }
        // </Box>
    );
}

export default Main;
