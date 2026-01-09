import { Box, InlineMessage } from '@navikt/ds-react';
import React from 'react';

export const Contact = () => {
    return (
        <Box paddingInline={'12'} paddingBlock={'6'}>
            <InlineMessage id={'support-contact'} status="info" size="medium">
                Dersom det oppstår problemer, eller du har spørsmål som ikke blir besvart her kan du
                ta kontakt med Novari support{' '}
                <a href="https://support.jira.novari.no/servicedesk/customer/portals" target="_top">
                    her
                </a>
            </InlineMessage>
        </Box>
    );
};
