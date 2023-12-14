import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Heading, HelpText, HStack, VStack} from "@navikt/ds-react";

interface InformationTemplateProps {
    id: string;
    children: React.ReactNode;
    keyPrefix: string;
    wide?: boolean;
    customHeading?: boolean;
    headingHelpText?: { title: string, info: string };
}

const PageTemplate = ({id, children, keyPrefix, headingHelpText, wide, customHeading}: InformationTemplateProps) => {
    const {t} = useTranslation('translations', {keyPrefix: keyPrefix});

    return (
        <Box paddingInline={wide ? "8" : "32"} paddingBlock="8" id={id + "-content"}>
            <VStack id={id + "-content-stack"} gap={"6"}>
                {!customHeading && <HStack gap={"2"} align="center">
                    <Heading size={"medium"} id={id + '-header'}>{t('header')}</Heading>
                    {headingHelpText &&
                        <HelpText title={headingHelpText.title} placement="bottom">
                            {t(headingHelpText.info)}
                        </HelpText>}
                </HStack>}
                {children}
            </VStack>
        </Box>
    )
}
export default PageTemplate;