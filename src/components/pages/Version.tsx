import React from 'react';
import {RouteComponent} from "../../features/main/Route";
import {BodyLong,  Box, Heading,  VStack} from "@navikt/ds-react";
import SupportTemplate from "../templates/SupportTemplate";
import {Contact} from "../atoms/Contact";
import {ABOUT_VERSIONS, NOVEMBER23} from "../utils/version/VersionTexts";

const Version: RouteComponent = () => {

    return (
        <SupportTemplate keyPrefix={'pages.version'}>
            <Box id={"support-information"} background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
                 borderColor={"border-subtle"}>
                <VStack gap={"6"}>
                    <BodyLong>
                        {ABOUT_VERSIONS}
                    </BodyLong>
                </VStack>
            </Box>
            <Box id={"support-information"} background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
                 borderColor={"border-subtle"}>
                <VStack gap={"6"}>
                    <Heading size={"small"}>
                        Versjon 23.11 - November 2023
                    </Heading>
                    <BodyLong>
                        {NOVEMBER23}
                    </BodyLong>
                </VStack>
            </Box>
        <Contact/>
        </SupportTemplate>
    )
}

export default Version;