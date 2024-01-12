import { createContext, useState } from "react";
import { IIntegration } from "../features/integration/types/Integration";
import { IConfiguration } from "../features/configuration/types/Configuration";
import { IIntegrationStatistics } from "../features/dashboard/types/IntegrationStatistics";
import { IIntegrationMetadata } from "../features/configuration/types/Metadata/IntegrationMetadata";
import { ContextProps } from "../util/constants/interface";
import { sourceApplications } from "../features/configuration/defaults/DefaultValues";
import IntegrationRepository from "../api/IntegrationRepository";
import SourceApplicationRepository from "../api/SourceApplicationRepository";
import EventRepository from "../api/EventRepository";
import ConfigurationRepository from "../api/ConfigurationRepository";
import { useQuery } from "@tanstack/react-query";
import useAllIntegrations from "../hooks/useGetAllIntegrations";
import { log } from "console";

type IntegrationContextState = {
	id: string | undefined;
	setId: (number: string | undefined) => void;
	existingIntegration: IIntegration | undefined;
	setExistingIntegration: (integration: IIntegration | undefined) => void;
	integrations: IIntegration[] | undefined;
	setIntegrations: (integrations: IIntegration[]) => void;
	getIntegrationsBySourceApplicationId: (sourceApplicationId: string) => void;
	getAllIntegrations: () => void;
	configuration: IConfiguration | undefined;
	setConfiguration: (configuration: IConfiguration | undefined) => void;
	configurations: IConfiguration[] | undefined;
	setConfigurations: (configurations: IConfiguration[]) => void;
	getConfiguration: (integration: string, excludeElements: boolean) => void;
	destination: string;
	selectedMetadata: IIntegrationMetadata | undefined;
	setSelectedMetadata: (form: IIntegrationMetadata | undefined) => void;
	sourceApplicationIntegrationId: string;
	setSourceApplicationIntegrationId: (id: string) => void;
	setDestination: (destination: string) => void;
	sourceApplicationId: string;
	setSourceApplicationId: (destination: string) => void;
	resetIntegrationContext: () => void;
	resetIntegrations: () => void;
	statistics: IIntegrationStatistics[];
};

const contextDefaultValues: IntegrationContextState = {
	id: undefined,
	setId: () => undefined,
	existingIntegration: undefined,
	setExistingIntegration: () => undefined,
	integrations: [],
	setIntegrations: () => undefined,
	getIntegrationsBySourceApplicationId: () => undefined,
	getAllIntegrations: () => undefined,
	configuration: undefined,
	setConfiguration: () => undefined,
	configurations: undefined,
	getConfiguration: () => undefined,
	setConfigurations: () => undefined,
	destination: "",
	selectedMetadata: undefined,
	setSelectedMetadata: () => undefined,
	setDestination: () => undefined,
	sourceApplicationId: "",
	setSourceApplicationId: () => undefined,
	sourceApplicationIntegrationId: "",
	setSourceApplicationIntegrationId: () => undefined,
	resetIntegrationContext: () => undefined,
	resetIntegrations: () => undefined,
	statistics: [],
};
const IntegrationContext =
	createContext<IntegrationContextState>(contextDefaultValues);

const IntegrationProvider = ({ children }: ContextProps) => {
	const [existingIntegration, setExistingIntegration] = useState<
		IIntegration | undefined
	>(undefined);
	const [id, setId] = useState<string | undefined>(undefined);
	const [integrations, setIntegrations] = useState<IIntegration[] | undefined>(
		undefined
	);
	const [configuration, setConfiguration] = useState<
		IConfiguration | undefined
	>(contextDefaultValues.configuration);
	const [configurations, setConfigurations] = useState<
		IConfiguration[] | undefined
	>(contextDefaultValues.configurations);
	const [destination, setDestination] = useState<string>("");
	const [selectedMetadata, setSelectedMetadata] = useState<
		IIntegrationMetadata | undefined
	>(contextDefaultValues.selectedMetadata);
	const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] =
		useState<string>("");
	const [sourceApplicationId, setSourceApplicationId] = useState<string>("");
	const [statistics, setStatistics] = useState<IIntegrationStatistics[]>(
		contextDefaultValues.statistics
	);

	const { isError, isPending, allintegrations, error } = useAllIntegrations(
		0,
		1000,
		"state",
		"ASC"
	);

	console.log("HOW BOUT THIS", allintegrations?.data);
	const resetIntegrationContext = () => {
		setDestination("");
		setExistingIntegration(undefined);
		setSourceApplicationIntegrationId("");
		setSelectedMetadata(contextDefaultValues.selectedMetadata);
		setId(undefined);
		resetConfiguration();
	};

	const resetIntegration = () => {
		setExistingIntegration(undefined);
	};

	const resetIntegrationsAndStats = () => {
		setIntegrations([]);
		setStatistics([]);
	};

	// eslint-disable-next-line
	const resetConfiguration = () => {
		setConfigurations(undefined);
		setConfiguration(undefined);
	};

	const getIntegrationsBySourceApplicationId = async (
		sourceApplicationId: string
	) => {
		try {
			const response = await EventRepository.getStatistics();
			const data = response.data;

			if (data) {
				setStatistics(data);
				const stats = data;

				const metadataResponse = await SourceApplicationRepository.getMetadata(
					sourceApplicationId,
					true
				);
				const metadata = metadataResponse.data || [];

				const integrationResponse = await IntegrationRepository.getIntegrations(
					0,
					null,
					"state",
					"ASC"
				);
				const mergedList = integrationResponse.data || [];

				stats.forEach((value: IIntegrationStatistics) => {
					mergedList.forEach((integration: IIntegration) => {
						if (
							integration.sourceApplicationIntegrationId ===
							value.sourceApplicationIntegrationId
						) {
							integration.errors = value.currentErrors;
							integration.dispatched = value.dispatchedInstances;
						}
					});
				});

				metadata.forEach((value: IIntegrationMetadata) => {
					mergedList.forEach((integration: IIntegration) => {
						if (
							integration.sourceApplicationIntegrationId ===
							value.sourceApplicationIntegrationId
						) {
							integration.displayName = value.integrationDisplayName;
						}
					});
				});
				setIntegrations(mergedList);
			}
		} catch (e) {
			console.error("Error: ", e);
			resetIntegrationsAndStats();
		}
	};

	const getAllIntegrations = async () => {
		try {
			const response = await EventRepository.getStatistics();
			const data = response.data;

			if (data) {
				console.log(data);
				setStatistics(data);
				const stats = data;

				const allMetadata = [];

				for (const sourceApplication of sourceApplications) {
					const metadataResponse =
						await SourceApplicationRepository.getMetadata(
							sourceApplication.value,
							true
						);
					allMetadata.push(metadataResponse.data);
				}

				const metadata =
					allMetadata.reduce(
						(acc, currentArray) => [...acc, ...currentArray],
						[]
					) || [];

				const info = allintegrations;
				console.log("====================================");
				console.log("iunfor", info?.data);
				console.log("====================================");
				const integrationResponse = await IntegrationRepository.getIntegrations(
					0,
					1000,
					"state",
					"ASC"
				);
				console.log("THIS THEN", integrationResponse.data.content);
				const mergedList = integrationResponse.data.content || [];

				stats.forEach((value: IIntegrationStatistics) => {
					mergedList.forEach((integration: IIntegration) => {
						if (
							integration.sourceApplicationIntegrationId ===
							value.sourceApplicationIntegrationId
						) {
							integration.errors = value.currentErrors;
							integration.dispatched = value.dispatchedInstances;
						}
					});
				});

				metadata.forEach((value: IIntegrationMetadata) => {
					mergedList.forEach((integration: IIntegration) => {
						if (
							integration.sourceApplicationIntegrationId ===
							value.sourceApplicationIntegrationId
						) {
							integration.displayName = value.integrationDisplayName;
						}
					});
				});
				setIntegrations(mergedList);
			}
		} catch (e) {
			console.error("Error: ", e);
			setIntegrations([]);
			resetIntegrationsAndStats();
		}
	};

	const getConfiguration = async (
		id: number | string,
		excludeElements?: boolean
	) => {
		ConfigurationRepository.getConfigurationById(id.toString(), excludeElements)
			.then((response) => {
				const data: IConfiguration = response.data;
				if (data) {
					setConfiguration(data);
				}
			})
			.catch((e) => {
				console.error("Error: ", e);
				setConfiguration(contextDefaultValues.configuration);
			});
	};

	return (
		<IntegrationContext.Provider
			value={{
				id,
				setId,
				statistics,
				existingIntegration,
				setExistingIntegration,
				integrations,
				setIntegrations,
				getIntegrationsBySourceApplicationId,
				getAllIntegrations,
				configuration,
				setConfiguration,
				getConfiguration,
				configurations,
				setConfigurations,
				destination,
				setDestination,
				selectedMetadata,
				setSelectedMetadata,
				sourceApplicationId,
				sourceApplicationIntegrationId,
				setSourceApplicationIntegrationId,
				setSourceApplicationId,
				resetIntegrationContext,
				resetIntegrations: resetIntegration,
			}}
		>
			{children}
		</IntegrationContext.Provider>
	);
};

export { IntegrationContext, IntegrationProvider as default };
