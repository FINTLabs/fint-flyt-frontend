import React from "react";
import {Box, Heading, Label, Link, List, VStack} from "@navikt/ds-react";
import {RouteComponent} from "../../main/Route";
import {USER_GUIDE, WORD_LIST} from "../util/supportTexts";
import {useTranslation} from "react-i18next";

const UserGuide: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.support'});

    return (
        <Box paddingInline="32" id={"user-guide-content"}>
            <VStack gap={"6"}>
                <Heading id={"user-guide-heading"} size={"medium"}>{t('header')}</Heading>
                <Box background={"surface-default"} padding="6" paddingBlock={"8 4"} borderRadius={"xlarge"}
                     borderWidth="3" borderColor={"border-subtle"}>
                    <Label>Hvordan bruke Fint Flyt</Label>
                    <List as="ul" id={"guide-list"}>
                        {USER_GUIDE.map((item, index) => {
                            return (
                                <List.Item key={index}>
                                    {item}
                                </List.Item>
                            )
                        })}
                    </List>
                    <Label>Ordbok</Label>
                    <List as="ul" id={"guide-dictionary"}>
                        {WORD_LIST.map((item, index) => {
                            return (
                                <List.Item key={index}>
                                    {item}
                                </List.Item>
                            )
                        })}
                    </List>
                    <Link href={"/support"} id={"back-link"}>Tilbake</Link>
                </Box>
            </VStack>

        </Box>
    )
}

export default UserGuide;