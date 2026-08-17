import { BodyLong, Box, Heading, List, VStack } from '@navikt/ds-react';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import PageTemplate from '../../shared/components/layout/PageTemplate';
import { getAboutByLanguage, getVersionDataByLanguage } from '../../shared/components/utils/version/VersionTexts';
import { AuthorizationContext } from '../../shared/context/AuthorizationContext';

const Version: React.FC = () => {
    const { i18n } = useTranslation();
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized]);
    useEffect(() => {
        getAuthorization();
    }, []);

    return (
        <PageTemplate id={'version'} keyPrefix={'pages.version'}>
            <Box
                id={'version-information'}
                background={'surface-default'}
                maxWidth={'var(--a-breakpoint-lg)'}
            >
                <VStack gap="16">
                    <BodyLong>{getAboutByLanguage(i18n.language)}</BodyLong>

                    <VStack gap="8">
                        {getVersionDataByLanguage(i18n.language).map((value, i) => (
                            <VStack key={i} gap="0">
                                <Heading level="2" size="small" spacing={false}>
                                    {value.heading}
                                </Heading>

                                <List as="ul">
                                    {value.updates.map((u, liIndex) => (
                                        <List.Item key={liIndex}>
                                            {u.title && <strong>{u.title} </strong>}
                                            {u.text}
                                        </List.Item>
                                    ))}
                                </List>
                            </VStack>
                        ))}
                    </VStack>
                </VStack>
            </Box>
        </PageTemplate>
    );
};
export default Version;
