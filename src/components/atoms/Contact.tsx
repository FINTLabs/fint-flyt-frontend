import {BodyShort, Box} from "@navikt/ds-react";
import React from "react";


export const Contact = () => {
    return (
        <Box id={"support-contact"} background={"surface-alt-3-subtle"} borderRadius="large" padding="6" borderWidth="3"
             borderColor={"border-alt-3"}>
            <BodyShort size="large">
                Dersom det oppstår problemer, eller du har spørsmål som ikke blir besvart her kan du ta kontakt med
                Novari support <a href="https://support.jira.novari.no/servicedesk/customer/portals" target="_top">her</a>
            </BodyShort>
        </Box>
    )
}