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

const Dashboard: RouteComponent = () => {
	const { t } = useTranslation("translations", {
		keyPrefix: "pages.dashboard",
	});

	const { alleintegrasjoner } = useGetAllIntegrations();

	const allIntegrations = alleintegrasjoner?.data;
	const allActiveIntegrations =
		allIntegrations?.filter(
			(integrasjoner: IIntegration | undefined) =>
				integrasjoner?.state === "ACTIVE"
		) || [];
	const allActiveIntegrationsLength = allActiveIntegrations.length;
	const { statistics, resetIntegrations, getAllIntegrations } =
		useContext(IntegrationContext);
	let totalErrors = 0;
	let totalDispatched = 0;

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
			value: totalErrors === 0 ? t("empty") : totalErrors.toString(),
			content: totalErrors === 1 ? t("oneError") : t("errors"),
			links: [
				{ name: t("links.instances"), href: "/integration/instance/list" },
			],
		},
	];

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
