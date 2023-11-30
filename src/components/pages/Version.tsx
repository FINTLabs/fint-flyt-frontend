import React from 'react';
import {RouteComponent} from "../../features/main/Route";
import {BodyLong,  Box,  VStack} from "@navikt/ds-react";
import InformationTemplate from "../templates/InformationTemplate";
import {ABOUT_VERSIONS, NOVEMBER23} from "../utils/version/VersionTexts";

const Version: RouteComponent = () => {
    return (
        <InformationTemplate keyPrefix={'pages.version'}>
            <Box id={"support-information"} background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
                 borderColor={"border-subtle"}>
                <VStack gap={"6"}>
                    <BodyLong>
                        {ABOUT_VERSIONS}
                    </BodyLong>
                    <BodyLong>
                        {NOVEMBER23}
                    </BodyLong>
                </VStack>
            </Box>
        </InformationTemplate>
    )
}
export default Version;