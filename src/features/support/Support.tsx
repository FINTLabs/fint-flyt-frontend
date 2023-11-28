import React from 'react';
import {useTranslation} from 'react-i18next';
import {RouteComponent} from "../main/Route";
import {FAQ, FLYT_DESCRIPTION} from "./util/supportTexts";
import {BodyLong, BodyShort, Box, ExpansionCard, Heading, Link, List, VStack} from "@navikt/ds-react";

const Support: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.support'});

    return (
        <Box paddingInline="32" id={"support-content"}>
            <VStack id={"support-content-stack"} gap={"6"}>
                <Heading size={"medium"} id={'support-header'}>{t('header')}</Heading>
                <Box id={"support-information"} background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
                     borderColor={"border-subtle"}>
                    <VStack gap={"6"}>
                        <Heading size={"small"}>
                            Hva er FINT Flyt?
                        </Heading>
                        <BodyLong>
                            {FLYT_DESCRIPTION}
                        </BodyLong>
                        <BodyLong>
                            Du kan se en brukerveiledning til hvordan du bruker Fint
                            Flyt <Link id={"support-guide-link"} href={"/support/guide"}>her.</Link>
                        </BodyLong>
                    </VStack>
                </Box>
                <Box id={"support-faq"}>
                    <ExpansionCard aria-label="default">
                        <ExpansionCard.Header id={"support-faq-header"}>
                            <ExpansionCard.Title>Ofte stilte spørsmål</ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <List as="ul" id={"faq-list"}>
                                {FAQ.map((item, index) => {
                                    return (
                                        <List.Item key={index} title={item.header}>
                                            {item.content}
                                        </List.Item>
                                    )
                                })}
                            </List>
                        </ExpansionCard.Content>
                    </ExpansionCard>
                </Box>
                <Box id={"support-contact"} background={"surface-alt-3-subtle"} borderRadius="large" padding="6" borderWidth="3"
                     borderColor={"border-alt-3"}>
                    <BodyShort size="large">
                        Dersom det oppstår problemer, eller du har spørsmål som ikke blir besvart her, ta kontakt med
                        prosjektleder <a href={"mailto:" + "jon.erik.stensrod@vigoiks.no"} target="_top">Jon Erik Stensrød</a>

                    </BodyShort>
                </Box>
            </VStack>
        </Box>
    )
}

export default Support;