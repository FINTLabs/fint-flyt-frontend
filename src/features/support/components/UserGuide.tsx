import React from "react";
import { Box, Label, Link, List, VStack } from "@navikt/ds-react";
import { RouteComponent } from "../../../routes/Route";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router";
import {
	getUserGuideByLanguage,
	getWordListByLanguage,
	getStatusDescriptionsByLanguage,
} from "../util/SupportUtil";
import PageTemplate from "../../../components/templates/PageTemplate";

const UserGuide: RouteComponent = () => {
	const { t } = useTranslation("translations", { keyPrefix: "pages.support" });
	const { i18n } = useTranslation();

	return (
		<PageTemplate id={"user-guide"} keyPrefix={"pages.support"}>
			<VStack gap={"6"}>
				<Box
					background={"surface-default"}
					padding="6"
					paddingBlock={"8 4"}
					borderRadius={"large"}
					borderWidth="2"
					borderColor={"border-subtle"}
				>
					<Label>{t("userGuide")}</Label>
					<List as="ul" id={"guide-list"}>
						{getUserGuideByLanguage(i18n.language).map((item, index) => {
							return <List.Item key={index}>{item}</List.Item>;
						})}
					</List>
					<Label>{t("wordList")}</Label>
					<List as="ul" id={"guide-dictionary"}>
						{getWordListByLanguage(i18n.language).map((item, index) => {
							return <List.Item key={index}>{item}</List.Item>;
						})}
					</List>
					<Label>{t("statusDescriptions")}</Label>
					<List as="ul" id={"guide-status-events"}>
						{getStatusDescriptionsByLanguage(i18n.language).map((item, index) => {
							return (
								<List.Item key={index}>
									<span dangerouslySetInnerHTML={{ __html: item }} />
								</List.Item>
							);
						})}
					</List>
					<Link as={RouterLink} to={"/"} id={"back-link"}>
						{t("back")}
					</Link>
				</Box>
			</VStack>
		</PageTemplate>
	);
};

export default UserGuide;
