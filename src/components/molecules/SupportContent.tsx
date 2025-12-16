import { Link as RouterLink } from "react-router";
import {
	BodyLong,
	Box,
	ExpansionCard,
	Heading,
	Link,
	List,
	VStack,
} from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Contact } from '../atoms/Contact';
import {
	getAboutFlytByLanguage,
	getFAQByLanguage,
} from "../../features/support/util/SupportUtil";

const SupportContent = () => {
	const { t } = useTranslation("translations", { keyPrefix: "pages.support" });
	const { i18n } = useTranslation();
	return (
        <>
            <Box id={'support-information'} background={'surface-default'} paddingBlock={'6'}>
                <VStack gap={'4'}>
                    <Heading size={'medium'}>{t('description')}</Heading>
                    <BodyLong>{getAboutFlytByLanguage(i18n.language)}</BodyLong>
                    <BodyLong>
                        {t('descriptionBody')}
                        <Link as={RouterLink} id={'support-guide-link'} to={'/support/guide'}>
                            {t('link')}
                        </Link>
                    </BodyLong>
                </VStack>
            </Box>
            <Box id={'support-faq'}>
                <ExpansionCard aria-label="default" size="small">
                    <ExpansionCard.Header id={'support-faq-header'}>
                        <ExpansionCard.Title size="small"> {t('FAQ')}</ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <List as="ul" id={'faq-list'}>
                            {getFAQByLanguage(i18n.language).map((item, index) => {
                                return (
                                    <List.Item key={index} title={item.header}>
                                        {item.content}
                                    </List.Item>
                                );
                            })}
                        </List>
                        <Contact />
                    </ExpansionCard.Content>
                </ExpansionCard>
            </Box>
        </>
    );
};

export default SupportContent;
