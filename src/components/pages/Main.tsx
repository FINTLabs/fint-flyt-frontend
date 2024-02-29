import React, {useContext, useEffect} from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";

function Main() {
    const {sourceApplications, getSourceApplications} = useContext(SourceApplicationContext)

    useEffect(() => {
        getSourceApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
            <AppBar/>
            {sourceApplications && <main>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
            }
        </Box>
    );
}

export default Main;
