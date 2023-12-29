import React, { useContext, useEffect } from "react";
import { IntegrationContext } from "../../context/IntegrationContext";
import DashboardCard from "./DashboardCard";
import { ICard } from "./types/Card";
import { useTranslation } from "react-i18next";
import { IIntegrationStatistics } from "./types/IntegrationStatistics";
import PageTemplate from "../../components/templates/PageTemplate";
import { RouteComponent } from "../../routes/Route";
import {
	BodyLong,
	Box,
	ExpansionCard,
	HStack,
	Heading,
	Link,
	List,
	VStack,
} from "@navikt/ds-react";
import { Link as RouterLink } from "react-router-dom";
import { FAQ, FLYT_DESCRIPTION } from "../support/util/supportTexts";
import { Contact } from "../../components/atoms/Contact";

const Dashboard: RouteComponent = () => {
	const { t } = useTranslation("translations", {
		keyPrefix: "pages.dashboard",
	});

	const { statistics, resetIntegrations, integrations, getAllIntegrations } =
		useContext(IntegrationContext);
	const activeIntegrations =
		integrations?.filter((integration) => integration.state === "ACTIVE") || [];
	let totalErrors = 0;
	let totalDispatched = 0;
	const totalActive = activeIntegrations.length;
	statistics?.map((stat: IIntegrationStatistics) => {
		totalErrors += stat.currentErrors;
		totalDispatched += stat.dispatchedInstances;
	});

	useEffect(() => {
		getAllIntegrations();
		resetIntegrations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const cards: ICard[] = [
		{
			value:
				integrations === undefined || integrations.length === 0
					? t("empty")
					: integrations.length.toString(),
			content:
				integrations !== undefined && integrations.length === 1
					? t("oneIntegration")
					: t("integrations"),
			links: [{ name: t("links.integration"), href: "/integration/new" }],
		},
		{
			value: totalActive === 0 ? t("empty") : totalActive.toString(),
			content:
				totalActive === 1 ? t("oneActiveIntegration") : t("activeIntegrations"),
			links: [{ name: t("links.integrations"), href: "/integration/list" }],
		},
		{
			value: totalDispatched === 0 ? t("empty") : totalDispatched.toString(),
			content: totalDispatched === 1 ? t("oneInstance") : t("instances"),
			links: [
				{ name: t("links.instances"), href: "/integration/instance/list" },
			],
		},
		{
			value: totalErrors === 0 ? t("empty") : totalErrors.toString(),
			content: totalErrors === 1 ? t("oneError") : t("errors"),
			links: [
				{ name: t("links.instances"), href: "/integration/instance/list" },
			],
		},
	];

	return (
		<PageTemplate id={"dashboard"} keyPrefix={"pages.dashboard"} customHeading>
			<HStack align={"center"} justify={"center"} gap={"16"}>
				{cards.map((card: ICard, index) => {
					return (
						<DashboardCard
							key={index}
							id={`dashboard-card-` + index}
							value={card.value}
							content={card.content}
							links={card.links}
						/>
					);
				})}
			</HStack>
			<Box
				id={"support-information"}
				background={"surface-default"}
				padding="6"
				borderRadius={"large"}
				borderWidth="2"
				borderColor={"border-subtle"}
			>
				<VStack gap={"6"}>
					<Heading size={"small"}>Hva er FINT Flyt?</Heading>
					<BodyLong>{FLYT_DESCRIPTION}</BodyLong>
					<BodyLong>
						Du kan se en brukerveiledning til hvordan du bruker Fint Flyt{" "}
						<Link
							as={RouterLink}
							id={"support-guide-link"}
							to={"/support/guide"}
						>
							her
						</Link>
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
								);
							})}
						</List>
					</ExpansionCard.Content>
				</ExpansionCard>
			</Box>
			<Contact />
		</PageTemplate>
	);
};

export default Dashboard;
