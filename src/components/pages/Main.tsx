import React from "react";
import ConfigurationProvider from "../../context/ConfigurationContext";
import Router from "../../routes/Router";
import {Box} from "@navikt/ds-react";
import {AppBar} from "../organisms/AppBar";

function Main() {
    /*
        const {getSourceApplications} = useContext(SourceApplicationContext)

        useEffect(() => {
            getSourceApplications()
        }, [])
    */

    return (
        <Box style={{height: "100vh", backgroundColor: "#EBF4F5"}}>
            <AppBar/>
            <main>
                <ConfigurationProvider>
                    <Router/>
                </ConfigurationProvider>
            </main>
        </Box>
    );
}

export default Main;
