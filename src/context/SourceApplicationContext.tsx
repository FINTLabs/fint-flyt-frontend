import React, { createContext, useState } from "react";

import {
	IInstanceMetadataContent,
	IInstanceObjectCollectionMetadata,
	IIntegrationMetadata,
} from "../features/configuration/types/Metadata/IntegrationMetadata";
import { ISelect } from "../features/configuration/types/Select";
import { IIntegration } from "../features/integration/types/Integration";
import { ContextProps } from "./constants/interface";
import { MOCK_INSTANCE_METADATA } from "../__tests__/mock/mapping/mock-instans-metadata";
import { sourceApplications } from "../features/configuration/defaults/DefaultValues";
import SourceApplicationRepository from "../api/SourceApplicationRepository";
import IntegrationRepository from "../api/IntegrationRepository";
import i18n from "../util/locale/i18n";
import { useGetMetadata } from "../hooks/sourceapplication/useGetMetadata";

type SourceApplicationContextState = {
	availableForms: ISelect[];
	getAllIntegrationsAndSetAvailableForms: (forms: ISelect[]) => void;
	getAvailableForms: (sourceApplicationId?: string) => void;
	allMetadata: IIntegrationMetadata[] | undefined;
	instanceElementMetadata: IInstanceMetadataContent | undefined;
	setInstanceElementMetadata: (
		instanceMetadataContent: IInstanceMetadataContent | undefined
	) => void;
	instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata[];
	getInstanceObjectCollectionMetadata: (key: string[]) => void;
	getAllMetadata: (onlyLatest: boolean) => void;
	getInstanceElementMetadata: (metadataId: string) => void;
	sourceApplication: number | undefined;
	setSourceApplication: (id: number | undefined) => void;
};

const contextDefaultValues: SourceApplicationContextState = {
	availableForms: [
		{
			value: "",
			label:
				i18n.language === "en"
					? "Select source application first"
					: "Velg kildeapplikasjon først",
		},
	],
	getAllIntegrationsAndSetAvailableForms: () => undefined,
	getAvailableForms: () => undefined,
	allMetadata: undefined,
	instanceElementMetadata: undefined,
	setInstanceElementMetadata: () => undefined,
	instanceObjectCollectionMetadata: [],
	getInstanceObjectCollectionMetadata: () => undefined,
	getAllMetadata: () => undefined,
	getInstanceElementMetadata: () => undefined,
	sourceApplication: undefined,
	setSourceApplication: () => undefined,
};

const SourceApplicationContext =
	createContext<SourceApplicationContextState>(contextDefaultValues);

const SourceApplicationProvider = ({ children }: ContextProps) => {
	const [availableForms, setAvailableForms] = useState<ISelect[]>(
		contextDefaultValues.availableForms
	);
	const [allMetadata, setAllMetadata] = useState<
		IIntegrationMetadata[] | undefined
	>(contextDefaultValues.allMetadata);
	const [instanceElementMetadata, setInstanceElementMetadata] = useState<
		IInstanceMetadataContent | undefined
	>(MOCK_INSTANCE_METADATA);
	const [
		instanceObjectCollectionMetadata,
		setInstanceObjectCollectionMetadata,
	] = useState<IInstanceObjectCollectionMetadata[]>([]);
	const [sourceApplication, setSourceApplication] = useState<
		number | undefined
	>(contextDefaultValues.sourceApplication);

	function getInstanceObjectCollectionMetadata(keys: string[]): void {
		setInstanceObjectCollectionMetadata(
			keys
				.map((key: string) =>
					instanceElementMetadata?.instanceObjectCollectionMetadata.find(
						(instanceObjectCollectionMetadata) =>
							instanceObjectCollectionMetadata.key === key
					)
				)
				.filter(
					(metadata): metadata is IInstanceObjectCollectionMetadata =>
						!!metadata
				)
		);
	}
	const getAvailableForms = async (sourceApplication?: string) => {
		try {
			const sourceAppId =
				sourceApplication !== undefined ? sourceApplication : "2";

			const response = await SourceApplicationRepository.getMetadata(
				sourceAppId,
				true
			);
			const data = response.data || [];

			const tempSelectables: ISelect[] = [
				{
					value: "",
					label:
						i18n.language === "en" ? "Select integration" : "Velg integrasjon",
				},
			];

			data.map((metadata: IIntegrationMetadata) => {
				tempSelectables.push({
					value: metadata.sourceApplicationIntegrationId,
					label: `[${metadata.sourceApplicationIntegrationId}] ${metadata.integrationDisplayName}`,
				});
			});

			await getAllIntegrationsAndSetAvailableForms(tempSelectables);
		} catch (err) {
			console.error(err);
			setAvailableForms([{ value: "null", label: "No options" }]);
		}
	};

	// denne må ha generiske verdier ved compile time - og hookes lenger ned - rules of hooks
	const { allMetadata: alleMetadata } = useGetMetadata("t", false);

	const getAllIntegrationsAndSetAvailableForms = async (forms: ISelect[]) => {
		try {
			const response = await IntegrationRepository.getAllIntegrations();
			const data = response.data || [];

			const ids: string[] = data.map(
				(integration: IIntegration) =>
					integration.sourceApplicationIntegrationId
			);

			if (sourceApplication !== undefined) {
				const selectableForms = forms.filter(
					(form) => !ids.includes(form.value)
				);
				setAvailableForms(selectableForms);
			}
		} catch (err) {
			console.error(err);
			setAvailableForms([{ value: "", label: "Ingen data" }]);
		}
	};

	const getAllMetadata = async (onlyLatest: boolean) => {
		try {
			const allMetadata: {
				params: [
					{
						kildeapplikasjonId: string;
						bareSisteVersjoner: boolean | undefined;
					}
				];
			}[] = [];

			for (const sourceApplication of sourceApplications) {
				const metadataResponse = await useGetMetadata(
					sourceApplication.value,
					onlyLatest
				);

				if (metadataResponse.allMetadata) {
					allMetadata.push(...metadataResponse.allMetadata);
				}
			}
			console.log("all META ", allMetadata);
			setAllMetadata(allMetadata);
		} catch (e) {
			console.error("Error: ", e);
			setAllMetadata([]);
		}
	};

	const getInstanceElementMetadata = (metadataId: string) => {
		SourceApplicationRepository.getInstanceElementMetadataById(metadataId)
			.then((response) => {
				const data: IInstanceMetadataContent = response.data;
				if (data) {
					setInstanceElementMetadata(data);
				}
			})
			.catch((err) => {
				setInstanceElementMetadata(undefined);
				console.error(err);
			});
	};

	return (
		<SourceApplicationContext.Provider
			value={{
				availableForms,
				getAvailableForms,
				allMetadata,
				instanceElementMetadata,
				setInstanceElementMetadata,
				instanceObjectCollectionMetadata,
				getInstanceObjectCollectionMetadata,
				getAllMetadata,
				getInstanceElementMetadata,
				getAllIntegrationsAndSetAvailableForms,
				sourceApplication,
				setSourceApplication,
			}}
		>
			{children}
		</SourceApplicationContext.Provider>
	);
};

export {
	SourceApplicationContext,
	contextDefaultValues,
	SourceApplicationProvider as default,
};
