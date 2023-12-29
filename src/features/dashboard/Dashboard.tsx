import React, { useContext, useEffect } from "react";
import { IntegrationContext } from "../../context/IntegrationContext";
import DashboardCard from "./DashboardCard";
import { ICard } from "./types/Card";
import { useTranslation } from "react-i18next";
import { IIntegrationStatistics } from "./types/IntegrationStatistics";
import PageTemplate from "../../components/templates/PageTemplate";
import { RouteComponent } from "../../routes/Route";
import { HStack } from "@navikt/ds-react";

import { Contact } from "../../components/atoms/Contact";
import SupportContent from "../../components/molecules/SupportContent";

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
			<SupportContent />
			<Contact />
		</PageTemplate>
	);
};

export default Dashboard;
