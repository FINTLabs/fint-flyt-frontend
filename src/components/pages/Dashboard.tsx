import React, { useContext, useEffect } from "react";
import { IntegrationContext } from "../../context/IntegrationContext";
import DashboardCard from "../organisms/DashboardCard";
import { ICard } from "../../features/dashboard/Card";
import { useTranslation } from "react-i18next";
import {
	IIntegration,
	IIntegrationStatistics,
} from "../../features/integration/types/Integration";
import PageTemplate from "../templates/PageTemplate";
import { RouteComponent } from "../../routes/Route";
import { Box, HStack } from "@navikt/ds-react";
import { Contact } from "../atoms/Contact";
import SupportContent from "../molecules/SupportContent";
import { useGetAllIntegrations } from "../../hooks/integration/useGetIntegrations";
import IntegrationRepository from "../../api/IntegrationRepository";

const Dashboard: RouteComponent = () => {
	const { t } = useTranslation("translations", {
		keyPrefix: "pages.dashboard",
	});

	const response = IntegrationRepository.getAllIntegrations();
	console.log(response);

	const { allAvailableIntegrations } = useGetAllIntegrations();
	const allIntegrations = allAvailableIntegrations?.data;
	const allActiveIntegrations =
		allIntegrations?.filter(
			(integration: IIntegration | undefined) => integration?.state === "ACTIVE"
		) || [];
	const allActiveIntegrationsLength = allActiveIntegrations.length;
	const { statistics, resetIntegrations, getAllIntegrations } =
		useContext(IntegrationContext);

	let currentErrors = 0;
	let totalDispatched = 0;
	statistics?.map((stat: IIntegrationStatistics) => {
		currentErrors += stat.currentErrors;
		totalDispatched += stat.dispatchedInstances;
	});
	const cards: ICard[] = [
		{
			value:
				allIntegrations === undefined || allIntegrations.length === 0
					? t("empty")
					: allIntegrations.length.toString(),
			content:
				allIntegrations !== undefined && allIntegrations.length === 1
					? t("oneIntegration")
					: t("integrations"),
			links: [{ name: t("links.integration"), href: "/integration/new" }],
		},
		{
			value:
				allActiveIntegrationsLength === 0
					? t("empty")
					: allActiveIntegrationsLength.toString(),
			content:
				allActiveIntegrationsLength === 1
					? t("oneActiveIntegration")
					: t("activeIntegrations"),
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
			value: currentErrors === 0 ? t("empty") : currentErrors.toString(),
			content: currentErrors === 1 ? t("oneError") : t("errors"),
			links: [
				{ name: t("links.instances"), href: "/integration/instance/list" },
			],
		},
	];

	useEffect(() => {
		getAllIntegrations();
		resetIntegrations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageTemplate id={"dashboard"} keyPrefix={"pages.dashboard"} customHeading>
			<HStack gap={"6"} wrap={false}>
				{cards.map((card: ICard, index) => {
					return (
						<Box
							key={index}
							style={{
								width: `calc(100% / ${cards.length})`,
								minWidth: "150px",
							}}
							id={`dashboard-card-` + index}
							value={card.value}
							content={card.content}
							padding={"0"}
							links={card.links}
						>
							<DashboardCard
								key={index}
								id={`dashboard-card-` + index}
								value={card.value}
								content={card.content}
								links={card.links}
							/>
						</Box>
					);
				})}
			</HStack>
			<SupportContent />
			<Contact />
		</PageTemplate>
	);
};

export default Dashboard;
