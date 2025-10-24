import apiAdapter from "./apiAdapter";
import {
	IConfiguration,
	IConfigurationPatch,
} from "../features/configuration/types/Configuration";

const getConfigurations = (
	page: number,
	size: number,
	sortProperty: string,
	sortDirection: string,
	complete: boolean,
	integrationId: string,
	excludeElements?: boolean
) => {
	return apiAdapter.get("/api/intern/konfigurasjoner/", {
		params: {
			side: page,
			antall: size,
			sorteringFelt: sortProperty,
			sorteringRetning: sortDirection,
			ferdigstilt: complete,
			integrasjonId: integrationId,
			ekskluderMapping: excludeElements,
		},
	});
};
const getConfigurationById = (
	configurationId: string,
	excludeElements?: boolean
) => {
	return apiAdapter.get<IConfiguration>(`/api/intern/konfigurasjoner/${configurationId}`, {
		params: { ekskluderMapping: excludeElements },
	});
};
const createConfiguration = (data: IConfiguration) => {
	return apiAdapter.post<IConfiguration>(`/api/intern/konfigurasjoner`, data);
};
const updateConfiguration = (
	configurationId: string,
	data: IConfigurationPatch
) => {
	return apiAdapter.patch<IConfiguration>(`/api/intern/konfigurasjoner/${configurationId}`, data);
};
const deleteConfiguration = (configurationId: string) => {
	return apiAdapter.delete(`/api/intern/konfigurasjoner/${configurationId}`);
};

const ConfigurationRepository = {
	createConfiguration,
	updateConfiguration,
	getConfigurations,
	getConfigurationById,
	deleteConfiguration,
};

export default ConfigurationRepository;
