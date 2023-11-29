import React from 'react';
import {useTranslation} from 'react-i18next';
import { Box, Heading, VStack} from "@navikt/ds-react";

interface SupportTemplateProps {
    children: React.ReactNode
    keyPrefix: string
}

const SupportTemplate = ({children, keyPrefix}:SupportTemplateProps) => {
    const {t} = useTranslation('translations', {keyPrefix: keyPrefix});

    return (
        <Box paddingInline="32" id={"support-content"}>
            <VStack id={"support-content-stack"} gap={"6"}>
                <Heading size={"medium"} id={'support-header'}>{t('header')}</Heading>
                {children}
            </VStack>
        </Box>
    )
}
export default SupportTemplate;