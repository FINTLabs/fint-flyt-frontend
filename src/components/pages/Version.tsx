import React, { useContext, useEffect } from 'react';
import { BodyLong, Box, Heading, List, VStack } from '@navikt/ds-react';
import PageTemplate from '../templates/PageTemplate';
import { getAboutByLanguage, getVersionDataByLanguage } from '../utils/version/VersionTexts';
import { RouteComponent } from '../../routes/Route';
import { useTranslation } from 'react-i18next';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { useNavigate } from 'react-router-dom';

const Version: RouteComponent = () => {
    const { i18n } = useTranslation();
    const { authorized, getAuthorization } = useContext(AuthorizationContext);
    const history = useNavigate();

    if (!authorized) {
        history('/forbidden');
    }
    useEffect(() => {
        getAuthorization();
    }, []);

    return (
        <PageTemplate id={'version'} keyPrefix={'pages.version'}>
            <Box
                id={'version-information'}
                background={'surface-default'}
                padding="6"
                borderRadius={'large'}
                borderWidth="2"
                borderColor={'border-subtle'}>
                <VStack gap={'6'}>
                    <BodyLong>{getAboutByLanguage(i18n.language)}</BodyLong>
                    <VStack gap={'6'}>
                        {getVersionDataByLanguage(i18n.language).map((value, i) => (
                            <VStack key={i} gap={'0'}>
                                <Heading level="2" size="small" spacing={false}>
                                    {value.heading}
                                </Heading>
                                <List as="ul">
                                    {value.updates.map((update, liIndex) => (
                                        <List.Item key={liIndex}>{update}</List.Item>
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
