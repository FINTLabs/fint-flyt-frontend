import React from 'react';
import {BodyLong, Box, List, VStack} from "@navikt/ds-react";
import PageTemplate from "../templates/PageTemplate";
import {
    getAboutByLanguage, getVersionDataByLanguage,
} from "../utils/version/VersionTexts";
import {RouteComponent} from "../../routes/Route";
import {useTranslation} from "react-i18next";

const Version: RouteComponent = () => {
    const {i18n} = useTranslation();

    return (
        <PageTemplate id={'version'} keyPrefix={'pages.version'}>
            <Box
                id={"version-information"}
                background={"surface-default"}
                padding="6"
                borderRadius={"large"}
                borderWidth="2"
                borderColor={"border-subtle"}
            >
                <VStack gap={"6"}>
                    <BodyLong>{getAboutByLanguage(i18n.language)}</BodyLong>
                    <BodyLong>
                        <VStack gap={"6"}>
                            {(getVersionDataByLanguage(i18n.language)).map((value, i) => (
                                <List key={i} as="ul" title={value.heading}>
                                    {value.updates.map((update, i) => (
                                        <List.Item key={i}>{update}</List.Item>
                                    ))}
                                </List>
                            ))}
                        </VStack>
                    </BodyLong>
                </VStack>
            </Box>
        </PageTemplate>
    )
}
export default Version;