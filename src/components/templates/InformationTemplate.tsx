import React from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Heading, HelpText, HStack, VStack} from "@navikt/ds-react";

interface InformationTemplateProps {
    children: React.ReactNode;
    keyPrefix: string;
    wide?: boolean;
    noHeading?: boolean;
    headingHelpText?: { title: string, info: string };
}

const InformationTemplate = ({children, keyPrefix, headingHelpText, wide, noHeading}: InformationTemplateProps) => {
    const {t} = useTranslation('translations', {keyPrefix: keyPrefix});

    return (
        <Box paddingInline={wide ? "8" : "32"} paddingBlock="8" id={"content"}>
            <VStack id={"content-stack"} gap={"6"}>
                {!noHeading && <HStack gap={"2"} align="center">
                    <Heading size={"medium"} id={'support-header'}>{t('header')}</Heading>
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
export default InformationTemplate;