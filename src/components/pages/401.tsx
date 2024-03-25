import {RouteComponent} from "../../routes/Route";
import React from "react";
import PageTemplate from "../templates/PageTemplate";
import {Box} from "@navikt/ds-react";

const Page401: RouteComponent = () => {
    return (
        <PageTemplate id={'version'} keyPrefix={'pages.401'}>
            <Box
                id={"version-information"}
                background={"surface-default"}
                padding="6"
                borderRadius={"large"}
                borderWidth="2"
                borderColor={"border-subtle"}
            >
                Unauthorized
            </Box>
        </PageTemplate>
    )
}
export default Page401;